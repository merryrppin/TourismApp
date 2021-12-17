"use strict";
(self["webpackChunkappmigi"] = self["webpackChunkappmigi"] || []).push([["src_app_shared_menu_menu_module_ts"],{

/***/ 2392:
/*!****************************************************!*\
  !*** ./src/app/shared/menu/menu-routing.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuPageRoutingModule": () => (/* binding */ MenuPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.page */ 1651);




const routes = [
    {
        path: 'tabs',
        component: _menu_page__WEBPACK_IMPORTED_MODULE_0__.MenuPage,
        children: [
            {
                path: 'inicio',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_sync_sync_service_ts"), __webpack_require__.e("src_app_modules_inicio_inicio_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../modules/inicio/inicio.module */ 8431)).then(m => m.InicioPageModule)
                    }
                ]
            },
            {
                path: 'religioso',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_sync_sync_service_ts"), __webpack_require__.e("default-src_app_modules_menu-categorias_menu-categorias_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../modules/menu-categorias/menu-categorias.module */ 5715)).then(m => m.MenuCategoriasPageModule)
                    }
                ]
            },
            {
                path: 'senderismo',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_sync_sync_service_ts"), __webpack_require__.e("default-src_app_modules_menu-categorias_menu-categorias_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../modules/menu-categorias/menu-categorias.module */ 5715)).then(m => m.MenuCategoriasPageModule)
                    }
                ]
            },
            {
                path: 'gastronomico',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_sync_sync_service_ts"), __webpack_require__.e("default-src_app_modules_menu-categorias_menu-categorias_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../modules/menu-categorias/menu-categorias.module */ 5715)).then(m => m.MenuCategoriasPageModule)
                    }
                ]
            },
            {
                path: 'perfil',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_sync_sync_service_ts"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../modules/perfil/perfil.module */ 3458)).then(m => m.PerfilPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/inicio',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
    }
];
let MenuPageRoutingModule = class MenuPageRoutingModule {
};
MenuPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], MenuPageRoutingModule);



/***/ }),

/***/ 8757:
/*!********************************************!*\
  !*** ./src/app/shared/menu/menu.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuPageModule": () => (/* binding */ MenuPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _menu_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-routing.module */ 2392);
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.page */ 1651);







let MenuPageModule = class MenuPageModule {
};
MenuPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _menu_routing_module__WEBPACK_IMPORTED_MODULE_0__.MenuPageRoutingModule
        ],
        declarations: [_menu_page__WEBPACK_IMPORTED_MODULE_1__.MenuPage]
    })
], MenuPageModule);



/***/ }),

/***/ 1651:
/*!******************************************!*\
  !*** ./src/app/shared/menu/menu.page.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuPage": () => (/* binding */ MenuPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _D_repos_TourismApp_1_AppMiGi_node_modules_ngtools_webpack_src_loaders_direct_resource_js_menu_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./menu.page.html */ 8591);
/* harmony import */ var _menu_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.page.scss */ 96);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _core_General_general_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/General/general.service */ 8220);





let MenuPage = class MenuPage {
    constructor(generalService) {
        this.generalService = generalService;
        this.lang = this.generalService.currentLanguage;
        this.generalService.languageChangeSubject.subscribe((value) => {
            this.lang = value;
        });
    }
    enviarParametroGeneral(categoria) {
        this.generalService.setCategoria(categoria);
    }
};
MenuPage.ctorParameters = () => [
    { type: _core_General_general_service__WEBPACK_IMPORTED_MODULE_2__.GeneralService }
];
MenuPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-menu',
        template: _D_repos_TourismApp_1_AppMiGi_node_modules_ngtools_webpack_src_loaders_direct_resource_js_menu_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_menu_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], MenuPage);



/***/ }),

/***/ 8591:
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/shared/menu/menu.page.html ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\r\n\r\n  <ion-tabs>   \r\n    \r\n    <ion-tab-bar slot=\"bottom\">\r\n      <ion-tab-button tab=\"inicio\">\r\n        <ion-icon src=\"../../assets/icon_home.svg\"></ion-icon>\r\n        <ion-label class=\"menuText\">{{lang===\"ENG\" ? \"Home\" : \"Inicio\"}}</ion-label>\r\n      </ion-tab-button>\r\n   \r\n      <ion-tab-button tab=\"religioso\" (click)=\"enviarParametroGeneral('RGS')\">\r\n        <ion-icon src=\"../../assets/icon_religioso.svg\"></ion-icon>\r\n        <ion-label class=\"menuText\">{{lang===\"ENG\" ? \"Religious\" : \"Religioso\"}}</ion-label>\r\n      </ion-tab-button>\r\n   \r\n      <ion-tab-button tab=\"senderismo\" (click)=\"enviarParametroGeneral('SDM')\">\r\n        <ion-icon src=\"../../assets/icon_Senderismo.svg\"></ion-icon>\r\n        <ion-label class=\"menuText\">{{lang===\"ENG\" ? \"Hiking\" : \"Senderismo\"}}</ion-label>\r\n      </ion-tab-button>\r\n\r\n      <ion-tab-button tab=\"gastronomico\" (click)=\"enviarParametroGeneral('GTM')\">\r\n        <ion-icon src=\"../../assets/icon_gastronomia.svg\"></ion-icon>\r\n        <ion-label class=\"menuText\">{{lang===\"ENG\" ? \"Gastronomic\" : \"Gastronómico\"}}</ion-label>\r\n      </ion-tab-button>\r\n\r\n      <ion-tab-button tab=\"perfil\">\r\n        <ion-icon src=\"../../assets/icon_miperfil.svg\"></ion-icon>\r\n        <ion-label class=\"menuText\">{{lang===\"ENG\" ? \"My profile\" : \"Mi perfil\"}}</ion-label>\r\n      </ion-tab-button>\r\n    </ion-tab-bar>\r\n   \r\n  </ion-tabs>\r\n\r\n");

/***/ }),

/***/ 96:
/*!********************************************!*\
  !*** ./src/app/shared/menu/menu.page.scss ***!
  \********************************************/
/***/ ((module) => {

module.exports = "ion-tab-button {\n  font-size: 10px;\n  --background: #3F3F3F;\n  --background-focused: #ffffff;\n  --color: #ffffff;\n  --color-focused: #ffffff;\n  --color-selected: #ffffff;\n  --padding-end: 0px;\n  --padding-start: 0px;\n  --margin-left:4px;\n  --margin-right:4px;\n  max-width: 100%;\n}\nion-tab-button ion-icon {\n  font-size: 45px;\n  margin-top: 3px;\n  margin-bottom: 0px;\n}\nion-icon {\n  margin-top: 3px;\n  margin-bottom: 3px;\n}\n.CardMenu {\n  background-color: #E5E5E5;\n  width: 100% !important;\n  height: 177px !important;\n}\nion-tab-button[aria-selected=true] {\n  background-color: #216CA7;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksZUFBQTtFQUNBLHFCQUFBO0VBQ0osNkJBQUE7RUFDSSxnQkFBQTtFQUNKLHdCQUFBO0VBQ0EseUJBQUE7RUFDRyxrQkFBQTtFQUNDLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFESjtBQUVJO0VBQ0ksZUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQUFSO0FBSUE7RUFFSSxlQUFBO0VBQ0Esa0JBQUE7QUFGSjtBQU1JO0VBQ0kseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHdCQUFBO0FBSFI7QUFRQTtFQUNJLHlCQUFBO0FBTEoiLCJmaWxlIjoibWVudS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmlvbi10YWItYnV0dG9ue1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgLS1iYWNrZ3JvdW5kIDogICMzRjNGM0Y7XHJcbi0tYmFja2dyb3VuZC1mb2N1c2VkOlx0ICAjZmZmZmZmOyBcclxuICAgIC0tY29sb3JcdDogI2ZmZmZmZjtcclxuLS1jb2xvci1mb2N1c2VkXHQgOiAgI2ZmZmZmZjtcclxuLS1jb2xvci1zZWxlY3RlZCA6ICAgI2ZmZmZmZjtcclxuICAgLS1wYWRkaW5nLWVuZDogMHB4O1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XHJcbiAgICAtLW1hcmdpbi1sZWZ0OjRweDtcclxuICAgIC0tbWFyZ2luLXJpZ2h0OjRweDtcclxuICAgIG1heC13aWR0aDoxMDAlOyAgXHJcbiAgICBpb24taWNvbntcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcclxuICAgIH1cclxufVxyXG5cclxuaW9uLWljb257XHJcblxyXG4gICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogIDNweDtcclxufVxyXG5cclxuXHJcbiAgICAuQ2FyZE1lbnV7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U1RTVFNTtcclxuICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgIGhlaWdodDogMTc3cHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG5pb24tdGFiLWJ1dHRvblthcmlhLXNlbGVjdGVkPXRydWVdIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMTZDQTc7XHJcbiB9Il19 */";

/***/ })

}]);
//# sourceMappingURL=src_app_shared_menu_menu_module_ts.js.map