module App{
	
	function domainInterceptor(appStateService: Common.IAppStateService): ng.IHttpInterceptor {
		return {
            request: function(config:ng.IRequestConfig) : ng.IRequestConfig {
                //if (appStateService.isOffline) config.url = appStateService.backend + config.url;
                return config;
            }
        }
	}
    
    function addInterceptor($httpProvider:ng.IHttpProvider){
        //$httpProvider.interceptors.push('domainInterceptor');
    }
	
    
    angular.module(Constants.vn.fSvcs)
        .factory('domainInterceptor', domainInterceptor)
        .config(addInterceptor);
}