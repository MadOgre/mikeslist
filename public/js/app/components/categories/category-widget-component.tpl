<a href=""
   ng-click="$ctrl.deleteCategory()"
   ng-if="!$ctrl.formOpen &&
          $ctrl.globals.adminEditMode">X</a>

<a ng-if="!$ctrl.formOpen"
   ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>

<a href=""
   ng-click="$ctrl.beginEdit()"
   ng-if="!$ctrl.formOpen &&
          $ctrl.globals.adminEditMode" >Edit</a>

<form name="categoryForm"
      ng-if="$ctrl.formOpen"
      ng-submit="categoryForm.$valid &&
                 $ctrl.submitCategory()"
      novalidate>

  <div class="error-messages">

    <div class="error-message error-message-category-required"
         ng-if="categoryForm.$submitted &&
                categoryForm.category.$error.required">
      Category name is required
    </div>

    <div class="error-message error-message-category-exists"
         ng-if="$ctrl.errors.categoryExists">
      Category with this name already exists
    </div>

    <div class="error-message error-message-unknown-error"
         ng-if="$ctrl.errors.unknownError">
      Unknown error has occured. Contact site administrator
    </div>

  </div>

  <input id="category-edit-field"
         name="category"
         ng-change="categoryForm.$valid &&
                    categoryForm.$setPristine()"
         ng-keydown="$ctrl.resetErrors()"
         ng-model="$ctrl.newCategoryName"
         required
         type="text">

  <button type="submit">OK</button>

  <button ng-click="$ctrl.cancelEdit()"
          type="button">
    Cancel
  </button>
</form>