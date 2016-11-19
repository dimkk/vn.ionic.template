module App {
    'using strict';
    export interface IOfflineService{
        setOffline():void;
        setOnline():void;
    }
    export class offlineService implements IOfflineService {
        state: Common.IAppStateService;

        items(): IExampleItem[] {
                return [
                    { id: Math.floor((Math.random() * 10000) + 1), type:"purple", message:"test Math.floor((Math.random() * 10000) + 1)" },
                    { id: Math.floor((Math.random() * 10000) + 1), type:"green", message:"test Math.floor((Math.random() * 10000) + 1)" },
                    { id: Math.floor((Math.random() * 10000) + 1), type:"black", message:"test Math.floor((Math.random() * 10000) + 1)" },
                    { id: Math.floor((Math.random() * 10000) + 1), type:"grey", message:"test Math.floor((Math.random() * 10000) + 1)" }
                ] as IExampleItem[];
        };

        eventsRepo: IExampleItem[];
     
        constructor(
            appStateService: Common.IAppStateService,
            private $httpBackend: ng.IHttpBackendService,
            private appLogger:Common.IAppLogger,
            private $timeout: ng.ITimeoutService
        ){
            this.state = appStateService;
            this.setInitRepo();
            
        }
        
        getAllEvents(): IExampleItem[] {   
            return this.eventsRepo;
        };

        setInitRepo = ()=>{
            var result = [] as IExampleItem[];
            result = this.items();
            this.eventsRepo = result;
        }
        addNewItems = (method, url, data):any =>{
            var newItems = this.items();
                this.eventsRepo = this.eventsRepo.concat(newItems);
                this.appLogger.debug(`addnewitems ${this.eventsRepo.length}`);
                return [200, newItems, {}];
        }
        getEvents = (method, url, data) => {
                this.appLogger.debug(`getevents ${this.eventsRepo.length}`);
                return [200, this.eventsRepo, {}];
            }
        getEvent = (method, url, data) => {
            var split = url.split('/');
            var id = split[split.length - 1];
            let item = this.eventsRepo.filter((value: IExampleItem, index:number) =>{
                return value.id.toString() === id;
            });
                return [200, item[0], {}];
            }

        getRefreshEvents = (method, url, data) =>{
            var items = this.items();
            this.eventsRepo = items.concat(this.eventsRepo);
             this.appLogger.debug(`refresh ${this.eventsRepo.length}`);
            
            return [200, items, {}];
        }
        
        public setOffline():void {
            this.$httpBackend.whenGET(/modules/).passThrough();
            this.$httpBackend.whenGET(/items\/refresh/).respond(this.getRefreshEvents);
            this.$httpBackend.whenGET(/items/).respond(this.getEvents);
            this.$httpBackend.whenGET(/items\/\d*/).respond(this.getEvent);           
            this.$httpBackend.whenPOST(/items\/more/).respond(this.addNewItems);
            
        }
        
        public setOnline():void {
            
        }       
    }

    angular.module(Constants.vn.fSvcs)
        .service('offlineService', offlineService);
}