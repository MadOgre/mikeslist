//This component widget is placed in the header and controls login and logout functionality
//via the userLoginService and authenticationService

//When login link is clicked the form is displayed

//The controller exposes the following functions

//login: sends the login information to the backend via userLoginService
//in case of successful login, cancel login function is called to clear the username and password
//in case of login failure form remains open and username and password is cleared

//logout: sends the logout request to userLoginService
//in case of failure the message is displayed (should never fail)

//cancelLogin: clears the username and password and closes the login form

(function(){
  "use strict";
  angular.module("mikeslist").
  component("loginLogoutWidgetComponent", {
    controller: loginLogoutWidgetController,
    templateUrl: "login-logout-widget-component.tpl"
  });

  loginLogoutWidgetController.$inject = [
    "$state",
    "$window",
    "authenticationService",
    "userLoginService"
  ];

  function loginLogoutWidgetController(
    $state,
    $window,
    authenticationService,
    userLoginService
  ) {
    var vm = this;

    //bind authentication bindings to have access to the currently
    //logged-in user information
    //(has properties: loggedIn(boolean), email(string), and admin(boolean))
    vm.authenticationBindings = authenticationService.bindings;

    //current error state
    vm.errors = {
      invalidLogin: false,
      unknownError: false
    };

    //tracks the state of the form
    vm.formOpen = false;

    //cancels the login, resets the email and password
    //closes the form and resets the error state
    vm.cancelLogin = function() {
      vm.email = "";
      vm.password = "";
      vm.formOpen = false;
      vm.resetErrors();
    };

    //attempts to log in via userLoginService
    vm.login = function() {
      userLoginService.login(vm.email, vm.password).
      then(function(){

        //if successful - cancel the login
        //this updates the authentication bindings
        vm.cancelLogin();
      }).
      catch(function(err) {

        //if unsuccessful - reset the email and password
        vm.email = "";
        vm.password = "";

        //set appropriate error status
        if (err.status === 403) {
          vm.errors.invalidLogin = true;
        } else {
          vm.errors.unknownError = true;
          console.error(err);
        }
      });
    };

    //attempts to log out via userLoginService
    vm.logout = function() {
      userLoginService.logout().
      then(function(){

        //if successful check if the current route is protected
        if ($state.current.data && $state.current.data.protected === "user") {

          //if protected load the categories state
          $state.go("root-state.categories-state", {}, {reload: true});
        } else {

          //else reload the current state
          $state.go($state.current, {}, {reload: true});            
        }
      }).
      catch(function(err) {

        //if unsuccessful set the appropriate error status
        vm.errors.unknownError = true;
        console.error(err);
      });
    };

    //resets error status
    vm.resetErrors = function() {
      for (var error in vm.errors) {
        vm.errors[error] = false;
      }
    };    
  }
})();