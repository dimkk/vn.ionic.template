module App {
    'use strict';
	export function mainStatesConfigurationList(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Constants.Paths.Tabs + '.' + 'main', {
                url: '/main',
                views: {
                    'main-tab': {
                        templateUrl: Constants.Paths.Modules + Constants.vn.iface +  '/main/main.html',
                        controller: 'mainController as vm'
                    }
                }
            })    
    }
    
    angular.module(Constants.vn.iface)
        .config(mainStatesConfigurationList)
}