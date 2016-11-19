module Common {
    'using strict';
    export interface IAppLoadingService {
        show(): void,
        hide(): void
    }
    export class appLoadingService implements IAppLoadingService {

        constructor(
            private $ionicLoading: ionic.loading.IonicLoadingService
        ){}

        public show(): void {
            // let options: ionic.loading.IonicLoadingOptions = {
            //     templateUrl: Constants.Paths.Modules + Constants.vn.iface + '/tabs/templates/loading.html'
            // };
            // this.$ionicLoading.show(options);
        }

        public hide(): void {
            //this.$ionicLoading.hide();
        }
    }

    angular.module(Constants.vn.cSvcs)
        .service('appLoadingService', appLoadingService);
}