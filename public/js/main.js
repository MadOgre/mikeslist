!function(){"use strict";angular.module("mikeslist",["ui.router"]).config(["$httpProvider",function(t){t.interceptors.push("tokenInterceptor")}]).run(["$transitions","$state",function(t,n){t.onError({},function(){n.go("root-state.categories-state")})}]).run(["authenticationService",function(t){t.check()}]).value("globals",{adminEditMode:!1})}();
!function(){"use strict";angular.module("mikeslist").config(["$stateProvider","$locationProvider","$urlRouterProvider",function(e,t,s){s.otherwise("/");var r={name:"root-state",abstract:!0,component:"rootComponent",resolve:{uncategorized:["categoriesService",function(e){return e.getListingsForCategory("uncategorized")}]}},o={name:"root-state.categories-state",url:"/",views:{"content-view":"categoriesComponent"},resolve:{categories:["categoriesService",function(e){return e.getAllCategories()}]}},n={name:"root-state.listings-state",url:"/category/{category}",views:{"content-view":"listingsComponent"},resolve:{category:["categoriesService","$stateParams",function(e,t){return e.getListingsForCategory(t.category)}]}},i={name:"root-state.listing-state",url:"/listing/{listingId}",views:{"content-view":"listingComponent"},resolve:{listing:["listingsService","$stateParams",function(e,t){return e.getListing(t.listingId)}]},params:{category:{}}},a={name:"root-state.new-listing-state",views:{"content-view":"postListingFormComponent"},resolve:{categories:["categoriesService",function(e){return e.getAllCategories()}]},data:{protected:"user"}},c={name:"root-state.edit-listing-state",views:{"content-view":"editListingFormComponent"},resolve:{categories:["categoriesService",function(e){return e.getAllCategories()}]},params:{listing:{}},data:{protected:"user"}},g={name:"root-state.users-state",url:"/users",resolve:{users:["usersService",function(e){return e.getAllUsers()}]},views:{"content-view":"usersComponent"},data:{protected:"user"}},u={name:"root-state.user-state",url:"/user/{email}",resolve:{user:["usersService","$stateParams",function(e,t){return e.getSingleUser(t.email)}]},views:{"content-view":"userComponent"},data:{protected:"user"}},l={name:"root-state.new-user-state",views:{"content-view":"createUserFormComponent"},data:{protected:"user"}},v={name:"root-state.edit-user-state",views:{"content-view":"editUserFormComponent"},params:{user:{}},data:{protected:"user"}};e.state(r),e.state(o),e.state(n),e.state(i),e.state(a),e.state(c),e.state(g),e.state(u),e.state(l),e.state(v),t.html5Mode(!0)}])}();
!function(){angular.module("mikeslist").run(["$templateCache",function(t){t.put("categories-component.tpl",'<ul>\r\n\r\n\t<li ng-repeat="category in $ctrl.categories">\r\n\t\t<category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)" category="category"></category-widget-component>\r\n\t</li>\r\n\r\n\t<li ng-if="$ctrl.globals.adminEditMode && $ctrl.uncategorized.listingCount > 0">\r\n\t\t<a ui-sref="root-state.listings-state({category: \'uncategorized\'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>\r\n\t</li>\r\n\t\r\n\t<li ng-if="$ctrl.globals.adminEditMode">\r\n\t\t<create-category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)"></create-category-widget-component>\r\n\t</li>\r\n</ul>'),t.put("category-widget-component.tpl",'<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">\r\n\tCategory with this name already exists\r\n</div>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.deleteCategory()">X</a>\r\n\r\n<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.beginEdit()">Edit</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-edit-field"\r\n\t       type="text"\r\n\t       ng-model="$ctrl.newValue"\r\n\t       required\r\n\t       ng-keydown="$ctrl.resetErrors()">\r\n\t<button type="submit">OK</button>\r\n\t<button type="button"\r\n\t        ng-click="$ctrl.cancelEdit()">\r\n\t    Cancel\r\n\t</button>\r\n</form>'),t.put("create-category-widget-component.tpl",'<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-create-field" autofocus type="text" placeholder="new category" ng-model="$ctrl.categoryName" required>\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>'),t.put("footer-component.tpl","<h1>This is the Footer</h1>"),t.put("header-component.tpl",'<h1>This is the Header</h1>\r\n<pre>Development testing data\r\nAdmin user: msemko@gmail.com\r\nPassword:   warcraft</pre>\r\n<a ui-sref="root-state.categories-state">Go home</a><br>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn" href="" ui-sref="root-state.new-listing-state">Post New Listing</a>\r\n<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && !$ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode Off</a>\r\n<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && $ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode On</a>\r\n<login-logout-widget-component></login-logout-widget-component>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.users-state">Users</a>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.listings-state({category: \'uncategorized\'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>'),t.put("listing-component.tpl",'<h2>{{$ctrl.listing.title}}</h2>\r\n<p>{{$ctrl.listing.body}}</p>\r\n<p>{{$ctrl.listing.posterEmail}}</p>\r\n<p>This listing can be found in these categories:</p>\r\n<ul>\r\n\t<li ng-repeat="category in $ctrl.listing.categories">\r\n\t\t<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>\r\n\t</li>\r\n</ul>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ui-sref="root-state.edit-listing-state({listing: $ctrl.listing})">edit me</a>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ng-click="$ctrl.deleteListing()">delete me</a>'),t.put("listing-form.tpl",'<form name="postListingForm" ng-submit="postListingForm.$valid && $ctrl.submitForm()" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-min-title-length" ng-if="postListingForm.$submitted && postListingForm.title.$error.minlength">\r\n\t\t\tTitle must be longer than 3 characters\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-title-required" ng-if="postListingForm.$submitted && postListingForm.title.$error.required">\r\n\t\t\tTitle is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-body-required" ng-if="postListingForm.$submitted && postListingForm.body.$error.required">\r\n\t\t\tListing cannot be empty\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-category-required" ng-if="\r\n\t\t$ctrl.errors.categoryRequired">\r\n\t\t\tYou must pick at least 1 category\r\n\t\t</div>\r\n\t</div>\r\n\t<input ng-model="$ctrl.listing.title"\r\n\t\t   type="text"\r\n\t\t   placeholder="title"\r\n\t\t   required\r\n\t\t   minlength="3"\r\n\t\t   maxlength="255"\r\n\t\t   name="title"\r\n\t\t   ng-change="postListingForm.$valid && postListingForm.$setPristine()">\r\n\t<span ng-if="255 - $ctrl.listing.title.length <= 20">{{255 - $ctrl.listing.title.length}}</span>\r\n\t<br>\r\n\t<textarea ng-model="$ctrl.listing.body"\r\n\t\t\t  name="body"\r\n\t\t\t  required\r\n\t\t\t  ng-change="postListingForm.$valid && postListingForm.$setPristine()"></textarea>\r\n\t<br>\r\n\t<label for="{{category.name + \'_checkbox\'}}"\r\n\t       ng-repeat-start="category in $ctrl.categories">{{category.name}}</label>\r\n\t<input id="{{category.name + \'_checkbox\'}}"\r\n\t       ng-model="$ctrl.checkboxesState[$index]"\r\n\t\t   ng-repeat-end\r\n\t\t   ng-true-value="\'{{category._id}}\'"\r\n\t\t   ng-change="$ctrl.errors.categoryRequired = false"\r\n\t\t   type="checkbox">\r\n\t<br>\r\n\t<button type="submit">Submit Form</button>\r\n</form>'),t.put("listings-component.tpl",'<ul>\r\n\t<li ng-repeat="listing in $ctrl.category.listings"><a ui-sref="root-state.listing-state({listingId: listing._id, category: $ctrl.category})">{{listing.title}}</a></li>\r\n</ul>\r\n<div ng-if="$ctrl.category.listingCount === 0">This category is empty</div>'),t.put("login-logout-widget-component.tpl",'<div nf-if="$ctrl.error" class="error-message">{{$ctrl.error}}</div>\r\n<a href="" ng-if="!$ctrl.formOpen && !$ctrl.bindings.loggedIn" ng-click="$ctrl.formOpen = true">Login</a>\r\n<span ng-if="$ctrl.bindings.loggedIn">Logged in as: {{$ctrl.bindings.email}}</span>\r\n<a href="" ng-if="$ctrl.bindings.loggedIn" ng-click="$ctrl.logout()">Logout</a>\r\n<form ng-if="$ctrl.formOpen" ng-submit="$ctrl.login()">\r\n\t<input type="text" ng-model="$ctrl.email" ng-change="$ctrl.error = \'\'">\r\n\t<input type="password" ng-model="$ctrl.password" ng-change="$ctrl.error = \'\'">\r\n\t<button type="submit">Login</button>\r\n\t<button type="button" ng-click="$ctrl.cancelLogin()">Cancel</button>\r\n</form>\r\n'),t.put("root-component.tpl",'<header class="site-header"><header-component uncategorized="$ctrl.uncategorized"></header-component></header>\r\n<main class="site-main" ui-view="content-view"></main>\r\n<footer class="site-footer"><footer-component></footer-component></footer>'),t.put("user-component.tpl",'<h1>{{$ctrl.user.email}}</h1>\r\n<p ng-if="$ctrl.user.admin">User is admin</p>\r\n<a href="" ui-sref="root-state.edit-user-state({user: $ctrl.user})">Edit me</a>\r\n<a href="" ng-click="$ctrl.deleteUser()" ng-if="$ctrl.authenticationBindings.email !== $ctrl.user.email">Delete me</a>'),t.put("user-form.tpl",'<form name="userForm" ng-submit="userForm.$valid && $ctrl.submitForm()" novalidate>\r\n\t<div class="error-messages">\r\n\t\t<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.required">\r\n\t\t\tEmail address is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.email">\r\n\t\t\tEmail address is invalid\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-password-required" ng-if="userForm.$submitted && userForm.password.$error.required">\r\n\t\t\tPassword is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-confirmation-required" ng-if="userForm.$submitted && userForm.confirmation.$error.required">\r\n\t\t\tPassword confirmation is required\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-passwords-mismatched" ng-if="$ctrl.errors.passwordMismatched">\r\n\t\t\tPasswords do not match\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-email-taken" ng-if="$ctrl.errors.emailExists">\r\n\t\t\tEmail is already taken\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-password-weak" ng-if="$ctrl.errors.weakPassword">\r\n\t\t\tThis password is too weak. Please refer to instructions below\r\n\t\t</div>\r\n\t\t<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">\r\n\t\t\tUnknown error has occured. Contact site administrator\r\n\t\t</div>\r\n\t</div>\r\n\t<input id="email-field" ng-model="$ctrl.user.email"\r\n\t\t   type="email"\r\n\t\t   placeholder="user@example.com"\r\n\t\t   required\r\n\t\t   name="email"\r\n\t\t   ng-keydown="$ctrl.resetErrors()"\r\n\t\t   ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<label for="admin-checkbox">User is admin: </label>\r\n\t<input type="checkbox"\r\n\t\t   ng-model="$ctrl.user.admin"\r\n\t\t   ng-disabled="$ctrl.email && $ctrl.authenticationBindings.email === $ctrl.email">\r\n\t<br>\r\n\t<input type="password"\r\n\t       ng-model="$ctrl.user.password"\r\n\t       ng-required="!$ctrl.email"\r\n\t       placeholder="password"\r\n\t       name="password"\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<input type="password"\r\n\t       ng-model="$ctrl.user.passwordConfirmation"\r\n\t       ng-required="!$ctrl.email"\r\n\t       placeholder="confirm password"\r\n\t       name="confirmation"\r\n\t       ng-keydown="$ctrl.resetErrors()"\r\n\t       ng-change="userForm.$valid && userForm.$setPristine()">\r\n\t<br>\r\n\t<button type="submit"\r\n\t\t\tng-click="$ctrl.errors.passwordMismatched = \'\'">\r\n\t\tSubmit Form\r\n\t</button>\r\n</form>\r\n<pre>Password requirements:\r\nPassword needs to be between 8-20 charachers long</pre>'),t.put("user-widget-component.tpl",'<a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.deleteUser()">X</a>\r\n\r\n<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.beginEdit()">Edit</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-edit-field" type="text" ng-model="$ctrl.newValue" required>\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>'),t.put("users-component.tpl",'<ul>\r\n\t<li ng-repeat="user in $ctrl.users">\r\n\t\t<a ui-sref="root-state.user-state({email: user.email})">{{user.email}}</a>\r\n\t</li>\r\n\t<li>\r\n\t\t<a href="" ui-sref="root-state.new-user-state">Create new user</a>\r\n\t</li>\r\n</ul>')}])}();
!function(){"use strict";angular.module("mikeslist").component("categoriesComponent",{bindings:{categories:"<",uncategorized:"<"},controller:["$scope","globals",function(o,e){var t=this;t.globals=e,t.broadcastCloseAllOthers=function(e){o.$broadcast("close:forms",e)}}],templateUrl:"categories-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("categoryWidgetComponent",{bindings:{category:"<",onBeginEdit:"&"},controller:["$scope","$state","$timeout","categoriesService","globals",function(e,t,n,o,r){var i=this;i.editing=!1,i.errors={categoryExists:!1},i.resetErrors=function(){for(var e in i.errors)i.errors[e]=!1},i.globals=r,i.newValue="",i.$onInit=function(){i.newValue=i.category.name},i.beginEdit=function(){i.onBeginEdit({except:i.category}),i.editing=!0,n(function(){document.getElementById("category-edit-field").focus(),document.getElementById("category-edit-field").select()})},i.cancelEdit=function(){i.editing=!1,i.newValue=i.category.name,i.resetErrors()},i.submitCategory=function(){o.editCategory(i.category.name,{name:i.newValue||""}).then(function(){i.editing=!1,t.go(t.current,{},{reload:!0})}).catch(function(e){n(function(){document.getElementById("category-edit-field").focus(),document.getElementById("category-edit-field").select()}),409===e.status&&(i.errors.categoryExists=!0)})},i.deleteCategory=function(){o.removeCategory(i.category.name).then(function(){t.go(t.current,{},{reload:!0})}).catch(function(e){window.alert(e.data.error),console.error(e)})},e.$on("close:forms",function(e,t){t._id!==i.category._id&&i.cancelEdit()})}],templateUrl:"category-widget-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("createCategoryWidgetComponent",{bindings:{onBeginEdit:"&"},controller:["$scope","$state","$timeout","categoriesService","globals",function(e,t,n,o,c){var i=this;i.editing=!1,i.categoryName="",i.globals=c,i.beginEdit=function(){i.onBeginEdit({except:"new"}),i.editing=!0,n(function(){document.getElementById("category-create-field").focus()})},i.cancelEdit=function(){i.editing=!1,i.categoryName=""},i.submitCategory=function(){o.createCategory(i.categoryName).then(function(){i.editing=!1,t.go(t.current,{},{reload:!0})}).catch(function(e){n(function(){document.getElementById("category-create-field").focus(),document.getElementById("category-create-field").select()}),window.alert(e.data.error),console.error(e)})},e.$on("close:forms",function(e,t){"new"!==t&&i.cancelEdit()})}],templateUrl:"create-category-widget-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("createUserFormComponent",{controller:["$state","$timeout","$scope","usersService",function(r,e,s,o){var t=this;t.user={},t.errors={passwordMismatched:!1,emailExists:!1,weakPassword:!1},t.resetErrors=function(){for(var r in t.errors)t.errors[r]=!1},t.submitForm=function(){return t.user.password!==t.user.passwordConfirmation?(t.errors.passwordMismatched=!0,s.userForm.$setPristine(),t.user.password="",void(t.user.passwordConfirmation="")):void o.createUser(t.user).then(function(e){r.go("root-state.user-state",{email:e.email},{reload:!0})}).catch(function(r){409===r.status?t.errors.emailExists=!0:400===r.status?t.errors.weakPassword=!0:(t.errors.unknownError=!0,console.error(r)),s.userForm.$setPristine(),t.user.password="",t.user.passwordConfirmation="",e(function(){document.getElementById("email-field").focus(),document.getElementById("email-field").select()})})}}],templateUrl:"user-form.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("editListingFormComponent",{bindings:{categories:"<"},controller:["$scope","$state","$stateParams","$timeout","listingsService",function(t,i,e,n,o){var r=this;r.listing={categories:[]},r.errors={categoryRequired:!1},r.checkboxesState=[],r.$onInit=function(){var t=r.categories.map(function(t){return t._id});Object.assign(r.listing,e.listing);var i=r.listing.categories.map(function(t){return t._id});r.checkboxesState=t.map(function(t){return i.indexOf(t)!==-1&&t})},t.$watch(function(){return r.checkboxesState},function(){r.listing.categories=r.checkboxesState.filter(function(t){return t})},!0),r.submitForm=function(){0===r.listing.categories.length?r.errors.categoryRequired=!0:o.editListing(e.listing._id,r.listing).then(function(){i.go("root-state.listing-state",{listingId:r.listing._id},{reload:!0})}).catch(function(t){window.alert(t.data.error),console.error(t),i.go("root-state.listing-state",{listingId:e.listing._id},{reload:!0})})}}],templateUrl:"listing-form.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("editUserFormComponent",{controller:["$state","$timeout","$stateParams","$scope","usersService","authenticationService",function(e,r,s,t,o,i){var n=this;n.user={},n.errors={passwordMismatched:!1,emailExists:!1,weakPassword:!1},n.resetErrors=function(){for(var e in n.errors)n.errors[e]=!1},n.email="",n.authenticationBindings=i.bindings,n.$onInit=function(){n.email=s.user.email,Object.assign(n.user,s.user)},n.submitForm=function(){return n.user.password!==n.user.passwordConfirmation?(n.errors.passwordMismatched=!0,t.userForm.$setPristine(),delete n.user.password,void delete n.user.passwordConfirmation):void o.updateUser(n.email,n.user).then(function(r){e.go("root-state.user-state",{email:r.email},{reload:!0})}).catch(function(e){409===e.status?n.errors.emailExists=!0:400===e.status?n.errors.weakPassword=!0:(n.errors.unknownError=!0,console.error(e)),t.userForm.$setPristine(),n.user.password="",n.user.passwordConfirmation="",r(function(){document.getElementById("email-field").focus(),document.getElementById("email-field").select()})})}}],templateUrl:"user-form.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("footerComponent",{templateUrl:"footer-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("headerComponent",{bindings:{uncategorized:"<"},controller:["globals","authenticationService",function(n,i){var t=this;t.globals=n,t.authenticationBindings=i.bindings,t.toggleAdminEditMode=function(){n.adminEditMode=!n.adminEditMode}}],templateUrl:"header-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("listingComponent",{bindings:{listing:"<"},controller:["authenticationService","listingsService","$state","$stateParams",function(t,e,n,i){var o=this;o.authenticationBindings=t.bindings,o.deleteListing=function(){window.confirm("Are you sure you want to permanently delete this listing?")&&e.deleteListing(o.listing._id).then(function(){i.category.name?n.go("root-state.listings-state",{category:i.category.name},{reload:!0}):n.go("root-state.categories-state",{},{reload:!0})}).catch(function(t){window.alert(t.data.error),console.error(t),n.go(n.current,{},{reload:!0})})}}],templateUrl:"listing-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("listingsComponent",{bindings:{category:"<"},templateUrl:"listings-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("loginLogoutWidgetComponent",{controller:["$window","$state","userLoginService","authenticationService",function(o,n,t,r){var e=this;e.formOpen=!1,e.bindings=r.bindings,e.login=function(){t.login(e.email,e.password).then(function(){e.cancelLogin()}).catch(function(o){e.email="",e.password="",403===o.status?e.error="Invalid email or password":(e.error="Error logging in, contact site owner",console.error(o))})},e.logout=function(){t.logout().then(function(){n.current.data&&"user"===n.current.data.protected?n.go("root-state.categories-state",{},{reload:!0}):n.go(n.current,{},{reload:!0})}).catch(function(o){console.error(o.data.error),console.error(o)})},e.cancelLogin=function(){e.email="",e.password="",e.formOpen=!1,e.error=""}}],templateUrl:"login-logout-widget-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("postListingFormComponent",{bindings:{categories:"<"},controller:["listingsService","$state","$scope",function(t,e,i){var o=this;o.listing={categories:[]},o.errors={categoryRequired:!1},o.checkboxesState=[],i.$watch(function(){return o.checkboxesState},function(){o.listing.categories=o.checkboxesState.filter(function(t){return t})},!0),o.submitForm=function(){0===o.listing.categories.length?o.errors.categoryRequired=!0:t.postListing(o.listing).then(function(t){e.go("root-state.listing-state",{listingId:t._id},{reload:!0})}).catch(function(t){window.alert(t.data.error),console.error(t),e.go("root-state.categories-state",{},{reload:!0})})}}],templateUrl:"listing-form.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("rootComponent",{bindings:{uncategorized:"<"},templateUrl:"root-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("userComponent",{bindings:{user:"<"},controller:["usersService","authenticationService","$state",function(e,t,n){var i=this;i.authenticationBindings=t.bindings,i.deleteUser=function(){window.confirm("Are you sure you want to permanently delete this user?")&&e.deleteUser(i.user.email).then(function(){n.go("root-state.users-state")})}}],templateUrl:"user-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("userWidgetComponent",{bindings:{user:"<"},templateUrl:"user-widget-component"})}();
!function(){"use strict";angular.module("mikeslist").component("usersComponent",{bindings:{users:"<"},templateUrl:"users-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").service("authenticationService",["$window",function(i){var n=this;n.bindings={loggedIn:!1},n.check=function(){i.localStorage.email&&i.localStorage.token?(n.bindings.loggedIn=!0,n.bindings.email=i.localStorage.email,n.bindings.admin=JSON.parse(i.localStorage.admin)):(n.bindings.loggedIn=!1,delete n.bindings.email,delete n.bindings.admin)}}])}();
!function(){"use strict";angular.module("mikeslist").service("categoriesService",["$http",function(t){var e=this;e.getAllCategories=function(){return t.get("/api/v1/categories").then(function(t){return t.data.filter(function(t){return"uncategorized"!==t.name})})},e.getListingsForCategory=function(e){return t.get("/api/v1/category/"+e).then(function(t){return t.data})},e.createCategory=function(e){return t.post("/api/v1/category",{name:e}).then(function(t){return t.data})},e.editCategory=function(e,n){return t.put("/api/v1/category/"+e,n).then(function(t){return t.data})},e.removeCategory=function(e){return t.delete("/api/v1/category/"+e).then(function(t){return t.data})}}])}();
!function(){"use strict";angular.module("mikeslist").service("listingsService",["$http",function(t){var n=this;n.getListing=function(n){return t.get("/api/v1/listing/"+n).then(function(t){return t.data})},n.postListing=function(n){return t.post("/api/v1/listing",n).then(function(t){return t.data})},n.editListing=function(n,i){return t.put("/api/v1/listing/"+n,i).then(function(t){return t.data})},n.deleteListing=function(n){return t.delete("/api/v1/listing/"+n).then(function(t){return t.data})}}])}();
!function(){"use strict";function e(e){return{request:function(t){return e.localStorage.token&&(t.headers["x-access-token"]=e.localStorage.token),t}}}angular.module("mikeslist").factory("tokenInterceptor",e),e.$inject=["$window"]}();
!function(){"use strict";angular.module("mikeslist").service("userLoginService",["$http","$window","$q","authenticationService","globals",function(e,i,n,a,t){var l=this;l.login=function(t,l){return e.post("/login",{email:t,password:l}).then(function(e){return i.localStorage.email=e.data.email,i.localStorage.admin=e.data.admin,i.localStorage.token=e.data.token,a.bindings.loggedIn=!0,a.bindings.email=e.data.email,a.bindings.admin=e.data.admin,n.resolve({result:"success"})})},l.logout=function(){return delete i.localStorage.token,delete i.localStorage.email,delete i.localStorage.admin,delete a.bindings.email,delete a.bindings.admin,a.bindings.loggedIn=!1,t.adminEditMode=!1,n.resolve({result:"success"})}}])}();
!function(){"use strict";angular.module("mikeslist").service("usersService",["$http",function(t){var e=this;e.getAllUsers=function(){return t.get("/api/v1/users").then(function(t){return t.data})},e.getSingleUser=function(e){return t.get("/api/v1/user/"+e).then(function(t){return t.data})},e.createUser=function(e){return t.post("/api/v1/user",e).then(function(t){return t.data})},e.updateUser=function(e,n){return t.put("/api/v1/user/"+e,n).then(function(t){return t.data})},e.deleteUser=function(e){return t.delete("/api/v1/user/"+e).then(function(t){return t.data})}}])}();
//# sourceMappingURL=main.js.map
