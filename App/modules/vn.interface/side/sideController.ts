module App {
	export class sideController {
		test = true;
		purple:boolean;
		green:boolean;
		black:boolean;
		gray:boolean;
		filters:any[]=[
			{
				name:"Purple",
				value:"purple",
				checked:true
			},
			{
				name:"Green",
				value:"green",
				checked:true
			},
			{
				name:"Black",
				value:"black",
				checked:true
			},
			{
				name:"Gray",
				value:"gray",
				checked:false
			}
		];
		constructor(
			private $rootScope: ng.IRootScopeService,
			private $state: ng.ui.IStateService,
			private appStorageService: Common.IAppStorageService,
			private appGeoService: Common.IAppGeoService,
			private appLogger: Common.IAppLogger,
			private $ionicSideMenuDelegate: ionic.sideMenu.IonicSideMenuDelegate
		) {
		}
		
		closeMe = () =>{
			this.$ionicSideMenuDelegate.toggleLeft();
		}
		
	}
	angular.module(Constants.vn.iface)
        .controller('sideController', sideController)
}