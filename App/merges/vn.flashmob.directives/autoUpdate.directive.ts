// // https://github.com/angular/angular.js/pull/9306/files
// module App {
//     angular.module('app')
//         .directive('autoUpdate', ['$interval', '$filter', function($interval, $filter) {
//             return {
//                 restrict : 'AEC',
//                 transclude: true,
//                 scope : {
//                     source: '=',
//                     uptime: '@',
//                     h1: '@',
//                     h2: '@',
//                     h3: '@',
//                     m1: '@',
//                     m2: '@',
//                     m3: '@',
//                     underway: '@',
//                     across: '@',
//                     showDate: '='
//                 },
//                 link: function(scope,elem,attrs) {
//                     scope.elem = elem;
//                     $interval(function(){
//                         scope.elem.text($filter('dateAndLeftTime')(scope.source, scope.h1, scope.h2, scope.h3, scope.m1, scope.m2, scope.m3, scope.underway, scope.across, scope.showDate));
//                     }, scope.uptime);
//                     var listener=scope.$watch('source',function(newval,oldval){
//                         if (newval) {
//                             scope.elem.text($filter('dateAndLeftTime')(scope.source, scope.h1, scope.h2, scope.h3, scope.m1, scope.m2, scope.m3, scope.underway, scope.across, scope.showDate));
//                             listener();
//                         }
//                     })
//                 }
//             }
//         }]);
// }