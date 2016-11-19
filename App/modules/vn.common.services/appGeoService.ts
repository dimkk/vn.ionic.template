module Common {
    'using strict';
    export interface ICoord{
		latitude: number;
		longitude: number;
	}
    export interface IAppGeoService {
        myLat: number;
        myLon: number;
        getMyLocation(fireEvent:boolean):ng.IPromise<boolean>;
        mesureDistance(mode:string):ng.IPromise<number>;
        map;
        getCoordByAddress(addr: string): ng.IPromise<ICoord>;
        getAddressByCoord(lat:any,lng:any): ng.IPromise<string>;
        locationInit:boolean;
    };
    export class appGeoService implements IAppGeoService {
        public myLat: number;
        public myLon: number;
        public map;
        private trace: ICoord[] = [];
        locationInit = false;
        constructor(
            private $cordovaGeolocation: any,
            private appStorageService: IAppStorageService,
            private $q: ng.IQService,
            private appLogger: IAppLogger,
            private $rootScope: ng.IRootScopeService
        ) {
            this.myLat = appStorageService.get<number>('myLat', '55.752900');
            this.myLon = appStorageService.get<number>('myLon', '37.617199');
            this.appLogger.debug(`Storage myLat:${this.myLat}, myLon:${this.myLon}`);
        }
        public getMyLocation(fireEvent:boolean): ng.IPromise<boolean> {
            this.appLogger.debug('getMyLocation start');
            var def = this.$q.defer();
            let posOptions: any = {
                enableHighAccuracy: false,
                timeout: 300000,
                maximumAge: 0

            }
            this.$cordovaGeolocation.getCurrentPosition(posOptions).then((position) => {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                //debug
                this.myLat = lat;
                this.myLon = lon;
                //
                this.appStorageService.set('myLat', lat);
                this.appStorageService.set('myLon', lon);
                if (fireEvent) this.$rootScope.$broadcast('myCoordsUpdated');
                if (!this.locationInit) {
                    this.$rootScope.$broadcast('locationInit'); //скажем всем, что локация инициализовалась
                    this.locationInit = true;
                }
                this.appLogger.debug(`GeoLocation myLat:${lat}, myLon:${lon} and event myCoordsUpdated fired? ${fireEvent}`);
                this.trace.push({ latitude: lat, longitude: lon });
                def.resolve(true);
            }).catch((err) => {
                this.appLogger.error('GeoLocationError: ' + JSON.stringify(err));
                def.reject(false);
            })
            return def.promise;
        }
        public mesureDistance(mode: string): ng.IPromise<number> { //DRIVING BICYCLING TRANSIT WALKING 
            this.appLogger.debug('mesureDistance start');
            var def = this.$q.defer();
            if (this.trace.length > 1) {
                if (this.map) {
                    this.getMyLocation(false).then(() => { this.mesureAfterNewGeo(mode, def) });
                } else {
                    this.appLogger.error('google map api was not initialized!');
                }
            } else {
                this.appLogger.debug('there was only one geo call, nothing to measure');
            }
            return def.promise;
        }
        public getCoordByAddress(addr: string): ng.IPromise<ICoord> {
            var def = this.$q.defer();
            debugger;
            var GeocodingService = new this.map.Geocoder();
            return def.promise;
        }
        public getAddressByCoord(lat:any,lng:any):ng.IPromise<string>{
            var def = this.$q.defer();
            var GeocodingService = new this.map.Geocoder();
            var self = this;
            GeocodingService.geocode({ 'location': { lat: parseFloat(lat), lng: parseFloat(lng) } }, function(results, status) {
                if (status === self.map.GeocoderStatus.OK) {
                    if (results[0]) {
                        var addr: string = results[0].formatted_address;
                        def.resolve(addr);
                    } else {
                        def.reject('No results found');
                    }
                } else {
                    def.reject('Geocoder failed due to: ' + status);
                }
            });
            return def.promise;
        }
        private mesureAfterNewGeo(mode, def){
            var directionsService = new this.map.DirectionsService();
                    var request = {
                        origin: new this.map.LatLng(
                            this.trace[this.trace.length - 2].latitude, 
                            this.trace[this.trace.length - 2].longitude
                        ),
                        destination: new this.map.LatLng(
                            this.trace[this.trace.length - 1].latitude, 
                            this.trace[this.trace.length - 1].longitude
                        ),
                        travelMode: this.map.TravelMode[mode],
                        optimizeWaypoints: true
                    };
             directionsService.route(request, function(response, status) {
                if (response.status === 'OK' && response.routes.length > 0){
                    if (response.routes[0].legs.length > 0){
                        def.resolve(response.routes[0].legs[0].distance.value)
                    } else {
                        this.appLogger.error(`google map api error - couldnot no legs in route response`);
                    }
                } else {
                    this.appLogger.error(`google map api error - couldnot build route for measure distance - ${response.status}`);
                    def.reject();
                }
             });
        }
    }

    angular.module(Constants.vn.cSvcs)
        .service('appGeoService', appGeoService);
}