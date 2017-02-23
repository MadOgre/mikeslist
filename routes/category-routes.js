"use strict";

let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");

var Category = require("../models").Category;
var Listing = require("../models").Listing;

router.use(bodyParser.json());

router.get("/categories", getAllCategories);
router.get("/category/:name", getSingleCategory);
router.post("/category", createNewCategory);
router.put("/category/:name", updateCategory);
router.delete("/category/:name", removeCategory);

function getAllCategories(req, res, next) {

	//get all categories
	Category.find().exec().

	then((categories) =>{

		//then return them
		return res.json(categories);
	}).

	catch(err => {
		return next(err);
	});
}

function getSingleCategory(req, res, next) {

	//get the category by name
	Category.findOne({name: req.params.name}).

	//populate all listing data for the category
	populate('listings').exec().

	then(foundCategory => {

		//check if category exists
		if (!foundCategory) {

			//if not construct the error and set the code to 404
			var error = new Error("Category not found");
			error.code = 404;

			//then abort the chain
			return Promise.reject(error);
		} else {
			return foundCategory;
		}
	}).

	then(foundCategory => {

		//else send back the category with all listings
		return res.json(foundCategory);
	}).
	
	catch(err => {
		return next(err);
	});
}

function createNewCategory(req, res, next) {

	//create new category in memory
	var category = new Category(req.body);

	//attempt to save
	category.save().
	then(foundCategory => {

		//if successful send the category object back
		return res.json(foundCategory);
	}).
	catch(err => {

		//if conflict with existing category, create a human readable error message to be handled
		if (err.code === 11000) {
			err.humanReadableError = "Category with this name already exists";
		} 
		return next(err);
	});
}

function updateCategory(req, res, next) {

	//if the change is requested for the 'uncategorized' category throw error
	if (req.params.name.toLowerCase() === "uncategorized") {
		return next(new Error("This category cannot be changed"));
	}

	//find the category in the database
	Category.findOne({name: req.params.name}).

	then(foundCategory => {
		if (!foundCategory) {

			//if not found, construct an error object and attach 404 code
			var error = new Error("Category not found");
			error.code = 404;

			//then abort the chain
			return Promise.reject(error);
		} else {

			//update the found category object
			Object.assign(foundCategory, req.body);

			//delete the version tag (necessary to prevent versioning errors)
			delete foundCategory.__v;

			//save changes to the database
			return foundCategory.save();
		}
	}).
	then(savedCategory => {

		//send back the saved category
		return res.json(savedCategory);
	}).
	catch(err => {

		//in case the category name is conflicting, attach a human readable error to be handled
		if (err.code === 11000) {
			err.humanReadableError = "Category with this name already exists";
		}
		return next(err);
	});
}

function removeCategory(req, res, next) {

	//the id for the 'uncategorized' category
	const UNCAT_CATEGORY_ID = "58a6d94b0a1cd92e7461811a";

	//category to be deleted
	var categoryToDelete = {};
	
	//locate the category to be deleted
	Category.findOne({name: req.params.name}).

	then(foundCategory => {
		
		//check if category exists
		if (!foundCategory) {

			//if not construct the error object
			var error = new Error("Category not found");
			error.code = 404;

			//and abort the chain
			return Promise.reject(error);
		} else {
			categoryToDelete = foundCategory;

			//update all listings in the found category to delete it
			//from their lists of categories
			return Listing.update(
				{
					categories: categoryToDelete._id
				},
				{
					$pull: {categories: categoryToDelete._id}
				},
				{
					multi: true
				}
			).exec();
		}
	}).
	then(() => {

		//update all listing which have no categories (orphaned)
		//and add the 'uncategorized' category to them
		return Listing.update(
			{
				categories: {
					$eq: []
				}
			},
			{
				$push: {categories: UNCAT_CATEGORY_ID}
			},
			{
				multi: true
			}
		).exec();
	}).
	then(() => {
		return Listing.find({categories: UNCAT_CATEGORY_ID}, {_id: 1}).exec();
	}).
	then(foundListings => {
		return foundListings.map(function(listing){
			return listing._id;
		});
	}).
	then(listingIds => {

		//update the 'uncategorized' category and push all the
		//uncategorized listings into it
		return Category.update(
			{
				_id: UNCAT_CATEGORY_ID
				//name: "uncategorized"
			},
			{
				$push: {
					listings: {
						$each: listingIds
					}
				}
			}
		).exec();
	}).
	then(() => {
		return categoryToDelete.remove();
	}).
	then(deletedCategory => {
		return res.json(deletedCategory);
	}).
	catch(err => {
		console.log(err);
		return next(err);
	});
}

module.exports = router;