module App {
	export function statesConfigurationTabs(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Tabs, {
                url: '/' + Constants.Paths.Tabs,
                abstract: true,
                templateUrl: Constants.Paths.Modules + Constants.vn.iface + '/tabs/templates/tabs.html',
                controller:'tabsController as vm'
            });
    }
    angular.module(Constants.vn.iface).config(statesConfigurationTabs);
}