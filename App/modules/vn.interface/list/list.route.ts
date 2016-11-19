// module App {
//     'use strict';
// 	export function statesConfigurationList(
//         $stateProvider: ng.ui.IStateProvider
//     ): void {

//         $stateProvider
//             .state(Constants.Paths.Tabs + '.' + 'list', {
//                 url: '/list',
//                 views: {
//                     'list-tab': {
//                         templateUrl: Constants.Paths.Modules + Constants.vn.iface +  '/eventsList/eventsList.html',
//                         controller: 'eventsListController as vm'
//                     }
//                 }
//             })    
//     }
    
//     angular.module(Constants.vn.iface)
//         .config(statesConfigurationList)
// }