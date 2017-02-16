<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}}</a> <a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.beginEdit()">Edit</a>
<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitForm()">
	<input id="category-edit-field" type="text" ng-model="$ctrl.newValue" required>
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>