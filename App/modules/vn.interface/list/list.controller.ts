// module App {
// 	'use strict';

// 	export class eventsListController {
// 		public list: IExampleItem[] = [];
// 		count: number = 1;
// 		idxToShow: number;
// 		reasonToRefresh:string;
// 		constructor(
// 			private $rootScope: ng.IRootScopeService,
// 			private $state: ng.ui.IStateService,
// 			private appStorageService: Common.IAppStorageService,
// 			private appGeoService: Common.IAppGeoService,
// 			private appLogger: Common.IAppLogger,
// 			private appLoadingService: Common.IAppLoadingService,
// 			private $timeout:ng.ITimeoutService,
// 			private $scope: ng.IScope,
// 			private ionicToast: any
// 		) {			
// 			this.appLogger.debug('eventsListController constructor');
// 			this.init();
// 			this.$rootScope.$on('userSwitch', ()=>{
// 				 this.purge();
// 				this.init();
// 			});
// 		}
		
// 		purge = () => {
// 			this.list = [];
// 			this.count = 1;
// 			this.flashmobStateService.params.listPage = 0;
// 		}

// 		init = (): void => {
// 			var self = this;
// 			this.simpleGet();
// 			this.appLogger.debug('after simpleGet');
// 			this.$rootScope.$on('myCoordsUpdated', ()=>{
// 				this.ionicToast.show(`Получили обновленные события`, 'bottom', false, 1500);
// 				this.appLogger.debug('myCoordsUpdated recieved');
// 				this.doRefresh();
// 			});
// 			this.$rootScope.$on('distanceChanged', ()=>{
// 				this.ionicToast.show(`Получили обновленные события`, 'bottom', false, 1500);
// 				this.appLogger.debug('distanceChanged recieved');
// 				this.doRefresh();
// 			});
// 			this.$rootScope.$on('filterChanged', ()=>{
// 				this.appLogger.debug('filterChanged recieved');
// 				this.doRefresh();
// 			});
//             //#100
// 		}
		
// 		showItem = (index: number) => {
// 			if (this.idxToShow != index) {
// 				this.idxToShow = index;
// 			} else {
// 				this.idxToShow = -1;
// 			}
// 		}

// 		goItem = (index: number) => {
// 			this.$state.go('tabs.eventDescription', { eventID: index });
// 		};

// 		simpleGet = ():void =>{ //походу идентичные с doRefresh
// 			this.appLoadingService.show();
// 			this.appLogger.debug(`in simpleGet`);
// 			this.flashmobStateService.params.listPage = 0;
// 			this.flashmobFacadeService.getEvents(
// 				this.appGeoService.myLat, 
// 				this.appGeoService.myLon, 
// 				this.flashmobStateService.params.filter, 
// 				this.flashmobStateService.params.listSize, 
// 				this.flashmobStateService.params.listPage)
// 					.then((data: IEvent[]) => {
// 						this.list = data;
// 						this.flashmobEventsStoreService.setEventList(data);
// 						this.appStorageService.setObject('list', data); 
// 						this.appLogger.debug(`new events list recieved, ${data.length} elements, saved to localstorage`);
// 					})
// 					.catch((err) => {
// 						this.appLogger.debug(`error recieving events list: ${JSON.stringify(err)}`);
// 					}).finally(()=>{
// 						this.$timeout(()=>{
// 							this.appLoadingService.hide();
// 							// try {
// 							// 	navigator.splashscreen.hide()
// 							// }catch (err) {
// 							// 	this.appLogger.error('nnavigator.splashscreen.hide() failed');
// 							// }
// 						}, 0);
// 						this.count = 0;
						
// 					})
// 		}
		
// 		doRefresh = (): void => {
// 			this.appLoadingService.show();
// 			this.flashmobStateService.params.listPage = 0;
// 			this.flashmobFacadeService.getRefreshEvents(
// 				this.appGeoService.myLat, 
// 				this.appGeoService.myLon, 
// 				this.flashmobStateService.params.filter,
// 				this.flashmobStateService.params.listSize, 
// 				0).then((data: IEvent[]) => 
// 				{
// 				this.list = data;	
// 				this.flashmobEventsStoreService.setEventList(data);
// 				//this.list = data.concat(this.list);
// 				this.appLogger.debug(`refresh list , ${data.length} elements`);
				
// 				this.$timeout(()=>{
// 							this.appLoadingService.hide();
// 						}, 0);
// 			}).finally(() => {
// 				this.$rootScope.$broadcast('scroll.refreshComplete');
// 				this.count = 0;
// 			});
// 		}
// 		loadMore = (): void => {
// 			this.flashmobStateService.params.listPage++;
// 			this.flashmobFacadeService.getEvents(
// 				this.appGeoService.myLat,
// 				this.appGeoService.myLon, 
// 				this.flashmobStateService.params.filter,
// 				this.flashmobStateService.params.listSize,
// 				this.flashmobStateService.params.listPage
// 				).then((data: IEvent[]) => {
// 					if (this.list.length > 0){
// 						this.list = this.list.concat(data);
// 						this.flashmobEventsStoreService.setEventList(this.list);
// 						this.appLogger.debug(`more items list , ${data.length} elements, page - ${this.flashmobStateService.params.listPage}`);
// 					} else {
// 						this.appLogger.debug('no init items');
// 					}
// 				this.$timeout(()=>{
// 							this.appLoadingService.hide();
// 						}, 0);
				
// 			}).finally(() => {
// 				this.count++;
// 				this.$rootScope.$broadcast('scroll.infiniteScrollComplete');
// 			})
// 		}
// 	}
// 	angular.module(Constants.vn.iface)
//         .controller('eventsListController', eventsListController)
// }