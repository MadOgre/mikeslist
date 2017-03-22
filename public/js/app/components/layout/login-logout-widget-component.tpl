<div class="login-logout-widget" ng-class="{expanded: $ctrl.formOpen, 'logged-in':$ctrl.authenticationBindings.loggedIn}">
  
  <a class="login-link"
     href=""
     ng-click="$ctrl.formOpen = true"
     ng-if="!$ctrl.formOpen &&
            !$ctrl.authenticationBindings.loggedIn">
    Login</a>

  <span ng-if="$ctrl.authenticationBindings.loggedIn">
    Logged in as: {{$ctrl.authenticationBindings.email | characters:25}}</span>

  <a href=""
     ng-click="$ctrl.logout()"
     ng-if="$ctrl.authenticationBindings.loggedIn">
    Logout</a>

  <form class="login-form"
        ng-submit="$ctrl.login()">

    <md-input-container class="email-field" ng-if="$ctrl.formOpen">   
      <input id="email-field"
             ng-keydown="$ctrl.resetErrors()"
             ng-model="$ctrl.email"
             placeholder="email"
             type="text">
    </md-input-container>
    <br>
    <md-input-container class="password-field" ng-if="$ctrl.formOpen">
      <input id="password-field"
             ng-keydown="$ctrl.resetErrors()"
             ng-model="$ctrl.password"
             placeholder="password" 
             type="password">
    </md-input-container>
    <br>
    <md-button ng-if="$ctrl.formOpen" class="button md-primary md-raised" type="submit">Login</md-button>

    <md-button ng-if="$ctrl.formOpen" class="button md-primary md-raised" ng-click="$ctrl.cancelLogin()"
            type="button">
      Cancel
    </md-button>
  </form>
  
</div>