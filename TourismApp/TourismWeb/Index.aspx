<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="TourismWeb.Index" %>

<!DOCTYPE html>
<html data-ng-app="tourismApp">
<head runat="server">
    <title></title>

    <%-- style fonts --%>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,700;1,300&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">


    <%--Angular reference  --%>
    <script src="Libs/jquery-3.6.0/jquery-3.6.0.min.js"></script>

    <%-- Style --%>
    <script src="Libs/bootstrap-5.1.0/js/bootstrap.min.js"></script>
    <link href="Libs/bootstrap-5.1.0/css/bootstrap.min.css" rel="stylesheet" />

    <%-- Angular --%>
    <script src="Libs/AngularJS-1.8.2/angular.min.js"></script>
    <script src="Libs/AngularJS-1.8.2/angular-route.min.js"></script>

    <%-- ag-grid --%>
    <script src="Libs/ag-grid/v17.1.1/ag-grid.min.js"></script>
    <link href="Libs/ag-grid/v17.1.1/ag-grid.css" rel="stylesheet" />


    <%-- Page reference --%>
    <script src="app/app.js"></script>
    <link href="Libs/ag-grid/ag-grid-style.css" rel="stylesheet" />
    <link href="Libs/ag-grid/v17.1.1/themes/ag-theme-balham.css" rel="stylesheet" />

    <%-- Script page --%>
    <script src="app/modules/general/login/loginCtrl.js"></script>
    <script src="app/modules/general/home/homeCtrl.js"></script>
    <script src="app/modules/general/generalSvc.js"></script>
    <script src="app/modules/general/religious/religiousCtrl.js"></script>
    <script src="app/modules/general/hiking/hikingCrtl.js"></script>
    <script src="app/modules/general/gastronomy/gastronomyCtrl.js"></script>

    <%-- stype pages --%>
    <link href="app/modules/general/home/home.css" rel="stylesheet" />

</head>
<body ng-controller="loginController as ctrl">

    <aside ng-include="ctrl.aside"></aside>

    <div>
        <div class="row">
            <div ng-view>
            </div>
        </div>
        <!--/row-->
    </div>

</body>
</html>
