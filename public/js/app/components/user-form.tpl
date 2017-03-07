<form name="userForm" ng-submit="userForm.$valid && $ctrl.submitForm()" novalidate>
	<div class="error-messages">
		<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.required">
			Email address is required
		</div>
		<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.email">
			Email address is invalid
		</div>
		<div class="error-message error-message-password-required" ng-if="userForm.$submitted && userForm.password.$error.required">
			Password is required
		</div>
		<div class="error-message error-message-confirmation-required" ng-if="userForm.$submitted && userForm.confirmation.$error.required">
			Password confirmation is required
		</div>
		<div class="error-message error-message-passwords-mismatched" ng-if="$ctrl.errors.passwordMismatched">
			Passwords do not match
		</div>
	</div>
	<input id="email-field" ng-model="$ctrl.user.email"
		   type="email"
		   placeholder="user@example.com"
		   required
		   name="email"
		   ng-change="userForm.$valid && userForm.$setPristine()">
	<br>
	<label for="admin-checkbox">User is admin: </label>
	<input type="checkbox" ng-model="$ctrl.user.admin" ng-disabled="$ctrl.email && $ctrl.authenticationBindings.email === $ctrl.email">
	<br>
	<input type="password"
	       ng-model="$ctrl.user.password"
	       ng-required="!$ctrl.email"
	       placeholder="password"
	       name="password"
	       ng-keydown="$ctrl.errors.passwordMismatched = ''"
	       ng-change="userForm.$valid && userForm.$setPristine()">
	<br>
	<input type="password"
	       ng-model="$ctrl.user.passwordConfirmation"
	       ng-required="!$ctrl.email"
	       placeholder="confirm password"
	       name="confirmation"
	       ng-keydown="$ctrl.errors.passwordMismatched = ''"
	       ng-change="userForm.$valid && userForm.$setPristine()">
	<br>
	<button type="submit"
			ng-click="$ctrl.errors.passwordMismatched = ''">
				Submit Form
	</button>
</form>