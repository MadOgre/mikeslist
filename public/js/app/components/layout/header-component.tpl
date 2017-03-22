<div class="logo">
  <h1>Mike's List</h1>
</div>

<login-logout-widget-component></login-logout-widget-component>

<nav class="nav admin-nav"
     ng-if="$ctrl.authenticationBindings.admin">
  <h2 class="menu-heading admin-menu-heading">Admin menu</h2>
  <ul class="menu admin-menu">
    <li>
      <a href=""
         ng-click="$ctrl.toggleAdminEditMode()"
         ng-if="!$ctrl.globals.adminEditMode">Edit Mode Off</a>

      <a href=""
         ng-click="$ctrl.toggleAdminEditMode()"
         ng-if="$ctrl.globals.adminEditMode">Edit Mode On</a>
    </li>
    <li>
      <a ui-sref="root-state.users-state">Users</a>
    </li>
    <li>
      <a ui-sref="root-state.listings-state({category: 'uncategorized'})">Uncategorized ({{$ctrl.uncategorized.listingCount}})</a>
    </li>
  </ul>
</nav>

<nav class="nav general-nav">
  <ul class="menu general-menu">
    <li>
      <a ui-sref="root-state.categories-state">Browse Categories</a>
    </li>
    <li ng-if="$ctrl.authenticationBindings.loggedIn">
      <a href=""
         ui-sref="root-state.new-listing-state">Post New Listing</a>      
    </li>
  </ul>
</nav>

<div class="clearfix"></div>

<pre class="dev-only md-whiteframe-4dp md-accent">
Development testing data
Admin user: msemko@gmail.com
Password:   warcraft
</pre>