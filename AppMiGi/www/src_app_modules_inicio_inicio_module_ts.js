(self["webpackChunkAppMiGi"] = self["webpackChunkAppMiGi"] || []).push([["src_app_modules_inicio_inicio_module_ts"],{

/***/ 9935:
/*!*********************************************************!*\
  !*** ./src/app/modules/inicio/inicio-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InicioPageRoutingModule": () => (/* binding */ InicioPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 1855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9535);
/* harmony import */ var _inicio_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inicio.page */ 6955);




const routes = [
    {
        path: '',
        component: _inicio_page__WEBPACK_IMPORTED_MODULE_0__.InicioPage
    }
];
let InicioPageRoutingModule = class InicioPageRoutingModule {
};
InicioPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], InicioPageRoutingModule);



/***/ }),

/***/ 8727:
/*!*************************************************!*\
  !*** ./src/app/modules/inicio/inicio.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InicioPageModule": () => (/* binding */ InicioPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 1855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2741);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6274);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3324);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 4595);
/* harmony import */ var _inicio_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inicio-routing.module */ 9935);
/* harmony import */ var _inicio_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inicio.page */ 6955);







let InicioPageModule = class InicioPageModule {
};
InicioPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _inicio_routing_module__WEBPACK_IMPORTED_MODULE_0__.InicioPageRoutingModule
        ],
        declarations: [_inicio_page__WEBPACK_IMPORTED_MODULE_1__.InicioPage]
    })
], InicioPageModule);



/***/ }),

/***/ 6955:
/*!***********************************************!*\
  !*** ./src/app/modules/inicio/inicio.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InicioPage": () => (/* binding */ InicioPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 1855);
/* harmony import */ var _raw_loader_inicio_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./inicio.page.html */ 1241);
/* harmony import */ var _inicio_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inicio.page.scss */ 9196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2741);




let InicioPage = class InicioPage {
    constructor() {
        this.imgsenderismo = [{ img: "https://1.bp.blogspot.com/-rgeqbzl6U1g/UXFz6UvjG-I/AAAAAAAABO0/TdbJnpN6EVo/s1600/20130224_130204.jpg" }, { img: "https://1.bp.blogspot.com/-7ZK1Uu53mVM/V6ifv_RXn-I/AAAAAAAAA5Q/mrcIZP_m3Ow5n0G0goBocd4g5rgnZ345gCK4B/s1600/air%2Bterjun%2Bcicurug.jpg" }];
        this.imgreligioso = [{ img: "https://i.pinimg.com/originals/12/ee/b9/12eeb9ea35bad398b6e4018a2b8c2235.jpg" }, { img: "https://live.staticflickr.com/7376/13838534255_3187b0670d_z.jpg" }];
        this.imggastronomico = [{ img: "https://media-cdn.tripadvisor.com/media/photo-s/1b/1d/70/1a/img-20200308-131106-largejpg.jpg" }, { img: "https://4.bp.blogspot.com/-cMvwaeUJpSE/VoCGcVVmw0I/AAAAAAAAG_Y/Lvfnuz5sOFQ/s640/bdaf8831-bd83-48cb-8623-a380250b7bbb.jpg" }];
        this.slideOptions = {
            initialSlide: 0,
            slidesPerView: 1,
            autoplay: true
        };
        //Item object for Nature
        this.sliderOne =
            {
                isBeginningSlide: true,
                isEndSlide: false,
                slidesItems: [
                    {
                        id: 995
                    },
                    {
                        id: 925
                    },
                    {
                        id: 940
                    },
                    {
                        id: 943
                    },
                    {
                        id: 944
                    }
                ]
            };
    }
    //Move to Next slide
    slideNext(object, slideView) {
        slideView.slideNext(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });
    }
    //Move to previous slide
    slidePrev(object, slideView) {
        slideView.slidePrev(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });
        ;
    }
    //Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }
    //Call methods to check if slide is first or last to enable disbale navigation  
    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }
    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }
    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }
};
InicioPage.ctorParameters = () => [];
InicioPage.propDecorators = {
    slideWithNav: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['slideWithNav', { static: false },] }]
};
InicioPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-inicio',
        template: _raw_loader_inicio_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_inicio_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], InicioPage);



/***/ }),

/***/ 9196:
/*!*************************************************!*\
  !*** ./src/app/modules/inicio/inicio.page.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".img-slider {\n  width: 100%;\n  height: 33%;\n}\n\n.center-text {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaWNpby5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNBO0VBQ0ksa0JBQUE7QUFFSiIsImZpbGUiOiJpbmljaW8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmltZy1zbGlkZXJ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzMlO1xyXG59XHJcbi5jZW50ZXItdGV4dHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufSJdfQ== */");

/***/ }),

/***/ 1241:
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/modules/inicio/inicio.page.html ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>inicio</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]= \"true\" class=\"ion-padding\">\r\n\r\n  <h5 class=\"center-text\">Menu Religioso</h5>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-prev\" (click)=\"slidePrev(sliderOne,slideWithNav)\">\r\n          <div class=\"prev-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isBeginningSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n      <ion-col size=\"10\">\r\n\r\n        <ion-slides pager=\"false\" [options]=\"slideOptions\" #slideWithNav\r\n          (ionSlideDidChange)=\"SlideDidChange(sliderOne,slideWithNav)\">\r\n          <ion-slide *ngFor=\"let s of imgreligioso\">\r\n            <img class=\"img-slider\" src=\"{{s.img}}\">\r\n          </ion-slide>\r\n        </ion-slides>\r\n\r\n      </ion-col>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-next\" (click)=\"slideNext(sliderOne,slideWithNav)\">\r\n          <div class=\"next-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isEndSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <h5 class=\"center-text\">Menu Gastronomico</h5>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-prev\" (click)=\"slidePrev(sliderOne,slideWithNav)\">\r\n          <div class=\"prev-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isBeginningSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n      <ion-col size=\"10\">\r\n\r\n        <ion-slides pager=\"false\" [options]=\"slideOptions\" #slideWithNav\r\n          (ionSlideDidChange)=\"SlideDidChange(sliderOne,slideWithNav)\">\r\n          <ion-slide *ngFor=\"let s of imggastronomico\">\r\n            <img class=\"img-slider\" src=\"{{s.img}}\">\r\n          </ion-slide>\r\n        </ion-slides>\r\n\r\n      </ion-col>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-next\" (click)=\"slideNext(sliderOne,slideWithNav)\">\r\n          <div class=\"next-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isEndSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <h5 class=\"center-text\">Menu Ecologico</h5>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-prev\" (click)=\"slidePrev(sliderOne,slideWithNav)\">\r\n          <div class=\"prev-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isBeginningSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n      <ion-col size=\"10\">\r\n\r\n        <ion-slides pager=\"false\" [options]=\"slideOptions\" #slideWithNav\r\n          (ionSlideDidChange)=\"SlideDidChange(sliderOne,slideWithNav)\">\r\n          <ion-slide *ngFor=\"let s of imgsenderismo\">\r\n            <img class=\"img-slider\" src=\"{{s.img}}\">\r\n          </ion-slide>\r\n        </ion-slides>\r\n\r\n      </ion-col>\r\n      <ion-col size=\"1\">\r\n        <span class=\"slider-nav arrow-next\" (click)=\"slideNext(sliderOne,slideWithNav)\">\r\n          <div class=\"next-icon-custom custon-nav\" [class.disabled]=\"sliderOne.isEndSlide\"></div>\r\n        </span>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=src_app_modules_inicio_inicio_module_ts.js.map