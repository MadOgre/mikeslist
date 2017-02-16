(function(){
	"use strict";
	angular.module("mikeslist").
	service("listingsService", ["$http", function($http){
		var vm = this;
		vm.getListing = function(listingId){
			return $http.get("/api/v1/listing/" + listingId).then(function(data){
				return data.data;
			});
		};
		vm.postListing = function(listing) {
			return $http.post("/api/v1/listing", listing).then(function(data){
				return data.data;
			});
		};
	}]);
})();