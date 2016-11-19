module App {
    'use strict';
    export class tabsController {
        public myEventBadge: number = 0;
        constructor(
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicTabsDelegate: ionic.tabs.IonicTabsDelegate,
            private $ionicPlatform: ionic.platform.IonicPlatformService,
            private $rootScope: ng.IRootScopeService,
            private $interval: ng.IIntervalService,
            private $state: ng.ui.IStateService
        ){
        }
        
        rt = (e, index) =>{
            this.$state.go(e);
                        //e.preventDefault();
            this.$ionicHistory.nextViewOptions({historyRoot:true});
        }
        
    }

    angular.module(Constants.vn.iface)
        .controller('tabsController', tabsController);

} 
