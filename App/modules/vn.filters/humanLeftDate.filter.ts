module App {
    'using strict';
    export function humanLeftDate(){
		return function(data) {
            if (!data) return data;
            return moment(data).startOf('minute').fromNow();
        };
    }

    angular.module('app')
		.filter('humanLeftDate', humanLeftDate);
}