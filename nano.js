// Create the Nano module
var Nano = angular.module("Nano", []);

// Add the 'number' directive for the number input type
Nano.directive('number', ['$filter',
   function ($filter) {
      return {
         restrict: 'A',
         require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.push(function (data) {
               
               // Don't accept the decimal separator if it's the first character
               var clean = data.replace(/[^0-9.,]/g, '');
               if (clean.charAt(0) == '.') {
                  clean = '';
               }
               
               // Allow only one decimal character
               var has_decimal = false;
               var clean_copy = '';
               for (var i = 0; i < clean.length; i++) {
                  if (clean.charAt(i) == '.') {
                     if (has_decimal) {
                        continue;
                     }
                     has_decimal = true;
                  }
                  clean_copy += clean.charAt(i);
               }
               
               // Prevent from rendering an invalid character
               if (clean_copy != data) {
                  ngModelCtrl.$setViewValue(clean_copy);
                  ngModelCtrl.$render();
               }
               return clean_copy;
            });
         }
      };
   }
]);