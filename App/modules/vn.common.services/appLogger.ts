module Common {
    'using strict';
    //Заготовка для логгера
    export interface IAppLogger{
        log(msg:string):void;
        warn(msg:string):void;
        info(msg:string):void;
        error(msg:string):void;
        debug(msg:string):void;
        messageBank:string[];
    }

    export class appLogger implements IAppLogger {
        public messageBank:string[] = [];
        constructor(
            private $log:ng.ILogService,
            private $filter:ng.IFilterService
        ){      }
        
        formatMessage = (msg:string) :string =>{
            var curDate = new Date();
            var formattedDate = this.$filter('date')(curDate, '[yyyy.MM.dd HH:mm:ss:sss]');
            var message = `${formattedDate} ${msg}`;
            return message;
        }
        
         log(msg:string):void {
             var formatted = this.formatMessage(msg);
             this.messageBank.unshift(formatted);
             this.$log.log(msg);
         }
          warn(msg:string):void {
             var formatted = this.formatMessage(msg);
             this.messageBank.unshift(formatted);
             this.$log.warn(msg);
         }
          info(msg:string):void {
              var formatted = this.formatMessage(msg);
             this.messageBank.unshift(formatted);
             this.$log.info(msg);
         }
          error(msg:string):void {
              var formatted = this.formatMessage(msg);
             this.messageBank.unshift(formatted);
             this.$log.error(msg);
         }
          debug(msg:string):void {
              var formatted = this.formatMessage(msg);
             this.messageBank.unshift(formatted);
              this.$log.debug(msg);
         }
    }

        angular.module(Constants.vn.cSvcs)
            .service('appLogger', appLogger);
}