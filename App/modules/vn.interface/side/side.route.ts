module App {
    'use strict';

    angular.module(Constants.vn.iface)
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Constants.Paths.Tabs + '.' + Constants.Paths.Side.Left, {
                url: '/' +  Constants.Paths.Side.Left,
                views: {
                    'left-tab': {
                        templateUrl: Constants.Paths.Modules + Constants.vn.iface + '/side/left.html',
                        controller:'sideController as vm'
                    }
                }
            }
        );
    }
}
