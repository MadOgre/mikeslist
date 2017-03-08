(function(){angular.module('mikeslist').run(['$templateCache', function($templateCache) {$templateCache.put('categories-component.tpl','<ul>\r\n\r\n\t<li ng-repeat="category in $ctrl.categories">\r\n\t\t<category-widget-component\r\n\t\t\tcategory="category"\r\n\t\t\ton-begin-edit="$ctrl.broadcastCloseAllOthers(except)">\r\n\t  </category-widget-component>\r\n\t</li>\r\n\r\n\t<li ng-if="$ctrl.globals.adminEditMode &&\r\n\t           $ctrl.uncategorized.listingCount > 0">\r\n\t\t<a ui-sref="root-state.listings-state({category: \'uncategorized\'})">\t\t\tuncategorized ({{$ctrl.uncategorized.listingCount}})</a>\r\n\t</li>\r\n\t\r\n\t<li ng-if="$ctrl.globals.adminEditMode">\r\n\t\t<create-category-widget-component\r\n\t\t  on-begin-edit="$ctrl.broadcastCloseAllOthers(except)">\r\n\t\t</create-category-widget-component>\r\n\t</li>\r\n\t\r\n</ul>');
$templateCache.put('category-widget-component.tpl','<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.deleteCategory()">X</a>\r\n\r\n<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.beginEdit()">Edit</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="categoryForm.$valid && $ctrl.submitCategory()" name="categoryForm" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-category-required" ng-if="categoryForm.$submitted && categoryForm.category.$error.required">\r\n\t\t\tCategory name is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">\r\n\t\t\tCategory with this name already exists\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">\r\n\t\t\tUnknown error has occured. Contact site administrator\r\n\t\t</div>\r\n\t</div>\r\n\t<input id="category-edit-field"\r\n\t       type="text"\r\n\t       ng-model="$ctrl.newValue"\r\n\t       required\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="categoryForm.$valid && categoryForm.$setPristine()"\r\n\t       name="category">\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>');
$templateCache.put('create-category-widget-component.tpl','<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="categoryForm.$valid && $ctrl.submitCategory()" name="categoryForm" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-category-required" ng-if="categoryForm.$submitted && categoryForm.category.$error.required">\r\n\t\t\tCategory name is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">\r\n\t\t\tCategory with this name already exists\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">\r\n\t\t\tUnknown error has occured. Contact site administrator\r\n\t\t</div>\r\n\t</div>\r\n\t<input id="category-create-field"\r\n\t       autofocus\r\n\t       type="text"\r\n\t       placeholder="new category"\r\n\t       ng-model="$ctrl.categoryName" \r\n\t       required\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="categoryForm.$valid && categoryForm.$setPristine()"\r\n\t       name="category">\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>');
$templateCache.put('footer-component.tpl','<h1>This is the Footer</h1>');
$templateCache.put('header-component.tpl','<h1>This is the Header</h1>\r\n\r\n<pre>\r\nDevelopment testing data\r\nAdmin user: msemko@gmail.com\r\nPassword:   warcraft\r\n</pre>\r\n\r\n<a ui-sref="root-state.categories-state">Go home</a>\r\n\r\n<br>\r\n\r\n<a href=""\r\n   ng-if="$ctrl.authenticationBindings.loggedIn"\r\n   ui-sref="root-state.new-listing-state">Post New Listing</a>\r\n\r\n<a href=""\r\n   ng-click="$ctrl.toggleAdminEditMode()"\r\n   ng-if="$ctrl.authenticationBindings.loggedIn &&\r\n          $ctrl.authenticationBindings.admin && \r\n          !$ctrl.globals.adminEditMode">Edit Mode Off</a>\r\n\r\n<a href=""\r\n   ng-click="$ctrl.toggleAdminEditMode()"\r\n   ng-if="$ctrl.authenticationBindings.loggedIn &&\r\n   \t\t    $ctrl.authenticationBindings.admin &&\r\n   \t\t    $ctrl.globals.adminEditMode">Edit Mode On</a>\r\n\r\n<login-logout-widget-component></login-logout-widget-component>\r\n\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && \r\n          $ctrl.authenticationBindings.admin"\r\n   ui-sref="root-state.users-state">Users</a>\r\n\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && \r\n          $ctrl.authenticationBindings.admin"\r\n   ui-sref="root-state.listings-state({category: \'uncategorized\'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>');
$templateCache.put('login-logout-widget-component.tpl','<a href=""\r\n   ng-click="$ctrl.formOpen = true"\r\n   ng-if="!$ctrl.formOpen &&\r\n          !$ctrl.authenticationBindings.loggedIn">\r\n  Login</a>\r\n\r\n<span ng-if="$ctrl.authenticationBindings.loggedIn">\r\n  Logged in as: {{$ctrl.authenticationBindings.email}}</span>\r\n\r\n<a href=""\r\n   ng-click="$ctrl.logout()"\r\n   ng-if="$ctrl.authenticationBindings.loggedIn">\r\n  Logout</a>\r\n\r\n<form ng-if="$ctrl.formOpen"\r\n      ng-submit="$ctrl.login()">\r\n\r\n  <div class="error-messages">\r\n\r\n    <div class="error-message error-message-login-invalid"\r\n         ng-if="$ctrl.errors.invalidLogin">\r\n      Invalid email or password\r\n    </div>\r\n\r\n    <div class="error-message error-message-unknown-error"\r\n         ng-if="$ctrl.errors.unknownError">\r\n      Unknown error has occured. Contact site administrator\r\n    </div>\r\n\r\n  </div>\r\n    \r\n  <input ng-keydown="$ctrl.resetErrors()"\r\n         ng-keydown="$ctrl.resetErrors()" \r\n         ng-model="$ctrl.email"\r\n         type="text">\r\n\r\n  <input ng-keydown="$ctrl.resetErrors()"\r\n         ng-model="$ctrl.password"\r\n         type="password">\r\n\r\n  <button type="submit">Login</button>\r\n\r\n  <button type="button"\r\n          ng-click="$ctrl.cancelLogin()">\r\n          Cancel\r\n  </button>\r\n</form>\r\n');
$templateCache.put('root-component.tpl','<header class="site-header">\r\n  <header-component uncategorized="$ctrl.uncategorized"></header-component>\r\n</header>\r\n\r\n<main class="site-main"\r\n      ui-view="content-view">\r\n</main>\r\n\r\n<footer class="site-footer">\r\n  <footer-component></footer-component>\r\n</footer>');
$templateCache.put('listing-component.tpl','<h2>{{$ctrl.listing.title}}</h2>\r\n<p>{{$ctrl.listing.body}}</p>\r\n<p>{{$ctrl.listing.posterEmail}}</p>\r\n<p>This listing can be found in these categories:</p>\r\n<ul>\r\n\t<li ng-repeat="category in $ctrl.listing.categories">\r\n\t\t<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>\r\n\t</li>\r\n</ul>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ui-sref="root-state.edit-listing-state({listing: $ctrl.listing})">edit me</a>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ng-click="$ctrl.deleteListing()">delete me</a>');
$templateCache.put('listing-form.tpl','<form name="postListingForm" ng-submit="postListingForm.$valid && $ctrl.submitForm()" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-min-title-length" ng-if="postListingForm.$submitted && postListingForm.title.$error.minlength">\r\n\t\t\tTitle must be longer than 3 characters\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-title-required" ng-if="postListingForm.$submitted && postListingForm.title.$error.required">\r\n\t\t\tTitle is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-body-required" ng-if="postListingForm.$submitted && postListingForm.body.$error.required">\r\n\t\t\tListing cannot be empty\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-category-required" ng-if="\r\n\t\t$ctrl.errors.categoryRequired">\r\n\t\t\tYou must pick at least 1 category\r\n\t\t</div>\r\n\t</div>\r\n\t<input ng-model="$ctrl.listing.title"\r\n\t\t   type="text"\r\n\t\t   placeholder="title"\r\n\t\t   required\r\n\t\t   minlength="3"\r\n\t\t   maxlength="255"\r\n\t\t   name="title"\r\n\t\t   ng-change="postListingForm.$valid && postListingForm.$setPristine()">\r\n\t<span ng-if="255 - $ctrl.listing.title.length <= 20">{{255 - $ctrl.listing.title.length}}</span>\r\n\t<br>\r\n\t<textarea ng-model="$ctrl.listing.body"\r\n\t\t\t  name="body"\r\n\t\t\t  required\r\n\t\t\t  ng-change="postListingForm.$valid && postListingForm.$setPristine()"></textarea>\r\n\t<br>\r\n\t<label for="{{category.name + \'_checkbox\'}}"\r\n\t       ng-repeat-start="category in $ctrl.categories">{{category.name}}</label>\r\n\t<input id="{{category.name + \'_checkbox\'}}"\r\n\t       ng-model="$ctrl.checkboxesState[$index]"\r\n\t\t   ng-repeat-end\r\n\t\t   ng-true-value="\'{{category._id}}\'"\r\n\t\t   ng-change="$ctrl.errors.categoryRequired = false"\r\n\t\t   type="checkbox">\r\n\t<br>\r\n\t<button type="submit">Submit Form</button>\r\n</form>');
$templateCache.put('listings-component.tpl','<ul>\r\n\t<li ng-repeat="listing in $ctrl.category.listings"><a ui-sref="root-state.listing-state({listingId: listing._id, category: $ctrl.category})">{{listing.title}}</a></li>\r\n</ul>\r\n<div ng-if="$ctrl.category.listingCount === 0">This category is empty</div>');
$templateCache.put('user-component.tpl','<h1>{{$ctrl.user.email}}</h1>\r\n<p ng-if="$ctrl.user.admin">User is admin</p>\r\n<a href="" ui-sref="root-state.edit-user-state({user: $ctrl.user})">Edit me</a>\r\n<a href="" ng-click="$ctrl.deleteUser()" ng-if="$ctrl.authenticationBindings.email !== $ctrl.user.email">Delete me</a>');
$templateCache.put('user-form.tpl','<form name="userForm" ng-submit="userForm.$valid && $ctrl.submitForm()" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.required">\r\n\t\t\tEmail address is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.email">\r\n\t\t\tEmail address is invalid\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-password-required" ng-if="userForm.$submitted && userForm.password.$error.required">\r\n\t\t\tPassword is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-confirmation-required" ng-if="userForm.$submitted && userForm.confirmation.$error.required">\r\n\t\t\tPassword confirmation is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-passwords-mismatched" ng-if="$ctrl.errors.passwordMismatched">\r\n\t\t\tPasswords do not match\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-email-taken" ng-if="$ctrl.errors.emailExists">\r\n\t\t\tEmail is already taken\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-password-weak" ng-if="$ctrl.errors.weakPassword">\r\n\t\t\tThis password is too weak. Please refer to instructions below\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">\r\n\t\t\tUnknown error has occured. Contact site administrator\r\n\t\t</div>\r\n\t</div>\r\n\t<input id="email-field" ng-model="$ctrl.user.email"\r\n\t\t   type="email"\r\n\t\t   placeholder="user@example.com"\r\n\t\t   required\r\n\t\t   name="email"\r\n\t\t   ng-keydown="$ctrl.resetErrors()"\r\n\t\t   ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<label for="admin-checkbox">User is admin: </label>\r\n\t<input type="checkbox"\r\n\t\t   ng-model="$ctrl.user.admin"\r\n\t\t   ng-disabled="$ctrl.email && $ctrl.authenticationBindings.email === $ctrl.email">\r\n\t<br>\r\n\t<input type="password"\r\n\t       ng-model="$ctrl.user.password"\r\n\t       ng-required="!$ctrl.email"\r\n\t       placeholder="password"\r\n\t       name="password"\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<input type="password"\r\n\t       ng-model="$ctrl.user.passwordConfirmation"\r\n\t       ng-required="!$ctrl.email"\r\n\t       placeholder="confirm password"\r\n\t       name="confirmation"\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<button type="submit"\r\n\t\t\tng-click="$ctrl.errors.passwordMismatched = \'\'">\r\n\t\tSubmit Form\r\n\t</button>\r\n</form>\r\n<pre>Password requirements:\r\nPassword needs to be between 8-20 charachers long</pre>');
$templateCache.put('users-component.tpl','<ul>\r\n\t<li ng-repeat="user in $ctrl.users">\r\n\t\t<a ui-sref="root-state.user-state({email: user.email})">{{user.email}}</a>\r\n\t</li>\r\n\t<li>\r\n\t\t<a href="" ui-sref="root-state.new-user-state">Create new user</a>\r\n\t</li>\r\n</ul>');}]);})();