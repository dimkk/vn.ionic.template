module App {
    'use strict';
    interface IMyScope extends ng.IScope {
        messages: string[];
        sendEmail(): void;
        selectAll(): void;
        changeLocale(): void;
    }
    export class NavigationController {
        messages: string[];
        showFilter: boolean = false;
        loggedIn:boolean = false;
        constructor(
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicTabsDelegate: ionic.tabs.IonicTabsDelegate,
            private $ionicPlatform: ionic.platform.IonicPlatformService,
            private $rootScope: ng.IRootScopeService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private appLogger: Common.appLogger,
            private $scope: IMyScope,
            private $cordovaEmailComposer: any,
            private $translate: any,
            private appStateService: Common.appStateService,
            private appStorageService: Common.IAppStorageService
        ) {
            $ionicPlatform.registerBackButtonAction(e => this.checkBack(e), 100);
            $rootScope.$on('$stateChangeStart', this.filterHandler);
            $scope.messages = this.appLogger.messageBank;

            
            $scope.changeLocale = () => {
                var curLocale = this.appStateService.shortLocale();
                var translateLocale = this.$translate.resolveClientLocale();

                this.appLogger.debug(`locale from translate - ${translateLocale}`);
                this.appLogger.debug(`current locale - ${curLocale}`);
                if (!curLocale || curLocale === 'ru') {
                    this.appStateService.locale = 'en-US';
                } else if (curLocale === 'en') {
                    this.appStateService.locale = 'ru-RU';
                }
                if (curLocale) {
                    this.$translate.use(curLocale).then(() => {
                        this.$rootScope.$broadcast('translateChanged');
                        this.appLogger.debug('event translateChanged fired!');
                    });
                }
            }
        }
        
       

        public goBack(): void {
            this.$ionicHistory.goBack();;
        }

        filterHandler = (event, toState, toParams, fromState, fromParams) => {
            // if (toState.name === 'tabs.list' || toState.name === 'tabs.map') {
            //     this.showFilter = true;
            // }
            // if (toState.name != 'tabs.list' && toState.name != 'tabs.map') {
            //     this.showFilter = false;
            // }
        };

        showDebug = () => {
            var opts: ionic.popup.IonicPopupFullOptions = {
                title: 'debug window',
                templateUrl: Constants.Paths.Modules + Constants.vn.iface + '/tabs/templates/popup.html',
                scope: this.$scope,
                buttons: [
                    {
                        text: 'Cancel',
                        type: 'button-default'
                    }, {
                        text: 'Отправить почту',
                        type: 'button-default',
                        onTap: (e) => {
                            this.$scope.sendEmail()
                        }
                    }, {
                        text: 'Поменять локаль',
                        type: 'button-default',
                        onTap: (e: angular.IAngularEvent) => {
                            this.$scope.changeLocale();
                            e.preventDefault();
                        }
                    }
                ]
            }
            this.$ionicPopup.show(opts);
        }


        public checkBack(e: Event): void {
            // var page = this.$ionicHistory.currentStateName();
            // if (page === Constants.Paths.Home.Base) {
            //     let nav: any = navigator;
            //     if (nav.app && nav.app.exitApp) {
            //         nav.app.exitApp();
            //     } else {
            //         window.close();
            //     }
            // } else {
            //     this.goBack();
            // }
        }

        private disableSwipe(e: Event): void {
            // For example on <ion-list>
            e.stopPropagation();
        }

        // public onSwipeLeft(): void {
        //     this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        // }

        // public onSwipeRight(): void {
        //     let index: number = this.$ionicTabsDelegate.selectedIndex();
        //     if (index > 0) {
        //         this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
        //     }
        // }
    }

    angular.module(Constants.vn.iface)
        .controller('navigationController', NavigationController);

} 
