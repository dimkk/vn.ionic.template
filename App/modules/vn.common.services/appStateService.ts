module Common {
    'using strict';
    export interface IAppStateService{
        locale:string;
        isIOS:boolean;
        isDevice:boolean;
        shortLocale():string;
        isOffline:boolean;
        backend:string;
    }
    export class appStateService implements IAppStateService {
        public locale:string;
        public isIOS:boolean;
        public isDevice:boolean;
        public isOffline:boolean;
        public backend:string;
        constructor(
            private appLogger:IAppLogger
        ){
            let loc = this.locale;
            const device = ionic.Platform.device();
            const platform = ionic.Platform.platform();
            const platformV = ionic.Platform.version();
            this.appLogger.debug(`device - ${JSON.stringify(device)}`);
            this.appLogger.debug(`platform - ${platform}`);
            this.appLogger.debug(`platform v - ${platformV}`);
            this.appLogger.debug(`app url - ${window.location.href}`);
            this.appLogger.debug(`app url origin - ${window.location.origin}`);
            
            var isWebView = ionic.Platform.isWebView();
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            var isWindowsPhone = ionic.Platform.isWindowsPhone();
            if (isWebView || isIPad || (isIOS && !this.checkForLocalhost()) || (isAndroid && !this.checkForLocalhost()) || isWindowsPhone)
            {
                this.isDevice = true;
            } else {
                this.isDevice = false;
            }
            this.isIOS = ionic.Platform.isIOS();
        }
        shortLocale = ()=>{
            if (this.locale)
            {
                var temp = 'en';
                try {
                    temp = this.locale.split('-')[0];
                    this.appLogger.debug(`short locale - ${temp}`);
                } catch (ex){
                    this.appLogger.error(`short locale create error - ${this.locale}`);
                } 
                return temp;
            }
        };
        checkForLocalhost = ()=>{
            return location.origin.indexOf('localhost') != -1;
        }
    }
         angular.module(Constants.vn.cSvcs)
            .service('appStateService', appStateService);
}