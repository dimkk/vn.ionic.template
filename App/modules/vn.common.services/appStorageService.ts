module Common {
    'using strict';

    export interface IAppStorageService {
        set(key: string, value: any): void;
        get<Type>(key: string, defaultValue?: string): Type;
        setObject(key: string, value: any): void;
        getObject(key: string);
        remove(key: string);
    }

    export class appStorageService implements IAppStorageService {
        private storageType = 'localStorage';
        constructor(
            private $window: ng.IWindowService,
            private appLogger: IAppLogger,
            private $rootScope: ng.IRootScopeService
        ) { }
        set(key, value) {
            this.$window[this.storageType][key] = value.toString();
            if (key === 'Bearer'){
                this.$rootScope.$broadcast('Bearer_set');
            }
        };
        get(key, defaultValue) {
            let value = this.$window[this.storageType][key];
            return value || defaultValue;
        };
        remove(key) {
            this.$window[this.storageType].removeItem(key);
            if (key === 'Bearer'){
                this.$rootScope.$broadcast('Bearer_remove');
            }
        };
        setObject(key, value) {
            this.$window[this.storageType][key] = JSON.stringify(value);
        };
        getObject = (key) => {
            try {
                return JSON.parse(this.$window[this.storageType][key] || null);
            } catch (ex) {
                this.appLogger.debug(`error fetching from localstorage, key - ${key}`);;
            }
        }
    }

    angular.module(Constants.vn.cSvcs)
        .service('appStorageService', appStorageService);
}