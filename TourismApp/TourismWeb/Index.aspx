<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="TourismWeb.Index" %>

<!DOCTYPE html>

<html data-ng-app="tourismApp">
<head runat="server">
    <title></title>

    <%--Angular reference  --%>
    <script src="Libs/jquery-3.6.0/jquery-3.6.0.min.js"></script>
    <script src="Libs/AngularJS-1.8.2/angular.min.js"></script>


    <%-- Page reference --%>
    <script src="app/app.js"></script>
    <script src="app/config.js"></script>


    <script src="app/modules/general/login/loginCtrl.js"></script>
    <script src="app/modules/general/generalSvc.js"></script>

    <link href="Libs/bootstrap-5.1.0/css/bootstrap.min.css" rel="stylesheet" />
    <style>
        .superiorDiv {
            margin-top: 15%;
        }

        .bannerColor {
            background-color: RGB(28,112,182) !important;
        }
    </style>
</head>
<body ng-controller="loginController as ctrl">
    <section class="vh-100">
        <div class="container-fluid h-custom superiorDiv">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="Images/Logos/Logo_alcaldia_01.png" class="img-fluid"
                        alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <br />
                    <form name="dataLogin" ng-submit="ctrl.loginUser(ctrl.LoginEntity)">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input type="email"
                                id="form3Example3"
                                class="form-control form-control-lg"
                                placeholder="Ingresar email"
                                ng-model="ctrl.LoginEntity.user"
                                required="required"
                                name="user" />
                            <label class="form-label" for="form3Example3">Correo electrónico</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input type="password"
                                id="form3Example4"
                                class="form-control form-control-lg"
                                placeholder="Ingresar contraseña"
                                required="required"
                                ng-model="ctrl.LoginEntity.password"
                                name="password" />
                            <label class="form-label" for="form3Example4">Contraseña</label>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Checkbox -->
                            <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">
                                    Recordarme
                                </label>
                            </div>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg bannerColor"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                                ng-disabled="dataLogin.$invalid ||  ctrl.IsLoad">
                                Ingresar</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                            </p>
                        </div>

                        <div class="row" ng-show="ctrl.IsValid">
                            <div class="col-md-12">
                                <div class="alert alert-danger">
                                    <strong>Por favor, verifique los datos de ingreso</strong>
                                    {{ ctrl.messageLoginInvalid }}
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
        <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between bannerColor py-4 px-4 px-xl-5 bg-primary">
            <!-- Copyright -->
            <div class="text-white mb-3 mb-md-0">
                Copyright © 2021. All rights reserved.
            </div>
            <!-- Copyright -->

            <!-- Right -->
            <div>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-google"></i>
                </a>
                <a href="#!" class="text-white">
                    <i class="fab fa-linkedin-in"></i>
                </a>
            </div>
            <!-- Right -->
        </div>
    </section>

</body>
</html>
