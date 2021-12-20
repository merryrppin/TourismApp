<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="TourismWeb.Index" %>

<!DOCTYPE html>
<html data-ng-app="tourismApp">

<head runat="server">
    <title></title>

    <%-- style fonts --%>
    <link href="Libs/MaterialIcons.css" rel="stylesheet" />

    <%-- Style --%>
    <link href="Libs/bootstrap-5.1.0/css/bootstrap.min.css" rel="stylesheet" />
    <link href="app/modules/general/touristSite/touristSite.css" rel="stylesheet" />

    <link href="Libs/tags/ng-tags-input.min.css" rel="stylesheet" />
    <link href="Libs/ag-grid/v17.1.1/ag-grid.css" rel="stylesheet" />

    <link href="Libs/ag-grid/ag-grid-style.css" rel="stylesheet" />
    <link href="Libs/ag-grid/v17.1.1/themes/ag-theme-balham.css" rel="stylesheet" />

    <link href="Libs/loading-bar.min.css" rel="stylesheet" />

    <%-- stype pages --%>
    <link href="app/modules/general/home/home.css" rel="stylesheet" />

</head>
<body ng-controller="loginController as ctrl">
    <div ng-cloak>
        <aside id="asideMenu" ng-include="ctrl.aside"></aside>
        <script> document.getElementById("asideMenu").style.display = 'none'; </script>
        <div class="contentView" ng-view></div>
    </div>

</body>



<%--Angular reference  --%>
<script src="Libs/jquery-3.6.0/jquery-3.6.0.min.js"></script>
<script src="Libs/bootstrap-5.1.0/js/bootstrap.min.js"></script>

<%-- Angular --%>
<script src="Libs/AngularJS-1.8.2/angular.min.js"></script>
<script src="Libs/AngularJS-1.8.2/angular-route.min.js"></script>

<%-- ag-grid --%>
<script src="Libs/ag-grid/v17.1.1/ag-grid.min.js"></script>

<%-- Page reference --%>
<script src="app/app.js"></script>
<script src="Libs/tags/ng-tags-input.min.js"></script>

<%-- Script page --%>
<script src="app/modules/general/login/loginCtrl.js"></script>
<script src="app/modules/general/logout/logout.js"></script>
<script src="app/modules/general/changePassword/changePassword.js"></script>
<script src="app/modules/general/home/homeCtrl.js"></script>
<script src="app/modules/general/generalSvc.js"></script>
<script src="app/modules/general/religious/religiousCtrl.js"></script>
<script src="app/modules/general/hiking/hikingCrtl.js"></script>
<script src="app/modules/general/gastronomy/gastronomyCtrl.js"></script>
<script src="app/modules/general/mustSeePlaces/mustSeePlaces.js"></script>
<script src="app/modules/general/officialHolidays/officialHolidays.js"></script>
<script src="app/modules/general/touristSite/touristSiteCtrl.js"></script>
<script src="Libs/loading-bar.min.js"></script>

<!-- Toastr -->
<script src="Libs/toaster/toaster.js"></script>
<link href="Libs/toaster/toaster.css" rel="stylesheet" />

</html>


