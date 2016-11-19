/// <reference path="constants/paths.ts" />
declare var Ionic:any;
module App {
    'use strict';

    angular.module(Constants.vn.fSvcs, []);
    angular.module(Constants.vn.iface, []);
    angular.module(Constants.vn.cSvcs, []);
    angular
        .module('app', [
            'ionic', 'ngMockE2E', 'uiGmapgoogle-maps',
            'ngCordova', 'ngCordovaOauth', 'ngAnimate', "angular-cache",
            'ionic.rating', 'nemLogging', 'ngCordova.plugins.facebook',
            'angularMoment', 'ionic-toast', 'pascalprecht.translate',
            'google.places',
            Constants.vn.iface,
            Constants.vn.fSvcs,
            Constants.vn.cSvcs
        ])
        .config(cfg)
        .run(runBlock);

    window['ionic'].Platform.ready(function () {

        angular.bootstrap(document.querySelector('body'), ['app']);

    });

    function runBlock(
        offlineService: IOfflineService,
        appStateService: Common.IAppStateService,
        $rootScope: ng.IRootScopeService,
        appLogger: Common.IAppLogger,
        appGeoService: Common.appGeoService,
        uiGmapGoogleMapApi: any,
        CacheFactory: any,
        $ionicPlatform: ionic.platform.IonicPlatformService,
        appLoadingService: Common.IAppLoadingService,
        amMoment: any,
        $location: ng.ILocationService
    ) {
        appLogger.debug('Application start');
        appLoadingService.show();

        //Enabling back button always
        $rootScope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        //Инициализируем кэши
        //В дальнейшем имплементировать кэши
        CacheFactory('eventsCache', { storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive' });
        CacheFactory('eventCache', { storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive' });
        CacheFactory('staticCache');

        uiGmapGoogleMapApi.then(function (maps) {
            appGeoService.map = maps;
            $rootScope.$broadcast('googleMapsInit');
        });

        offlineService.setOffline();

        document.addEventListener("deviceready", () => {
            appLogger.debug('deviceready fired');

            //Определяем локаль
            navigator.globalization.getPreferredLanguage(function (lang) {
                appStateService.locale = lang.value;
                appLogger.debug(`Определили локаль - ${appStateService.locale}`);
                amMoment.changeLocale(appStateService.shortLocale());
            }, function (err) {
                appLogger.error(JSON.stringify(err));
            });

            //Гео
            appGeoService.getMyLocation(true);

            if (appStateService.isDevice) {
                try {
                    navigator.splashscreen.hide();
                    appLogger.debug(JSON.stringify(cordova.plugins.email));
                } catch (ex) {
                    appLogger.error(`deviceready error email not ready ${JSON.stringify(ex)}`);
                }
            }


            //Токен и авторизация
            var appID = 1653218781618586;
            // var version = "v2.0"; // or leave blank and default is v2.0
            try {
                ionic.Platform.ready(function () {


                    appLogger.info('in ionic.Platform.ready');

                    var settings = new Ionic.IO.Settings();
                    var app_id = settings.get('app_id');

                    appLogger.info(app_id);

                    var push = new Ionic.Push({
                    "debug": true
                    });

                    appLogger.info('push created ' + JSON.stringify(push));

                    push.register(function(token) {
                    appLogger.info("Device token: " + token.token);
                    });
                    appLogger.info('push registered ');

                    //$cordovaFacebookProvider.browserInit(appID);
                });
                $ionicPlatform.ready(()=>{
                    appLogger.info('in $ionicPlatformready');
                })
            } catch (exception) {
                appLogger.error(`error - ${JSON.stringify(exception)}`);
            }


        }, false);

        if (appStateService.isIOS) {
            Date.prototype.toJSON = function (key) { //Safari fix
                function f(n) {
                    // Format integers to have at least two digits.
                    return n < 10 ? '0' + n : n;
                }
                return this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + '.' +
                    f(this.getUTCMilliseconds()) + 'Z';
            };
        }

    };
    // Configure routes
    function cfg(
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $ionicConfigProvider: ionic.utility.IonicConfigProvider,
        $cordovaFacebookProvider: any,
        $translateProvider: angular.translate.ITranslateProvider,
        uiGmapGoogleMapApiProvider: any
    ): void {
        moment().local();

        var appID = 1653218781618586;
        var version = "v2.0";

        if (window.location.origin == "http://localhost:8100") {
            $cordovaFacebookProvider.browserInit(appID, version);
            // version is optional. It refers to the version of API you may want to use.
        }

        $ionicConfigProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/tabs/main');

        $translateProvider.useStaticFilesLoader({
            prefix: Constants.Paths.Modules + Constants.vn.fSvcs + '/I18n/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('ru');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC1LDWHQVjAOVjsVZuh_UEoSQFnHaxruA0',
        v: '3.20', //defaults to latest 3.X anyhow
        //libraries: 'weather,geometry,visualization'
    });

    }
}
