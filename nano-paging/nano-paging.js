// Create the NanoPaging controller
Nano.controller('NanoPaging', function ($scope, $http, $location, $attrs) {
   
   // Set initial values from the url or $attrs
   $scope.show = $location.search().show ? $location.search().show : $attrs.show ? $attrs.show : 25;
   $scope.page = $location.search().page ? $location.search().page : 1;
   $scope.nav_pages = $attrs.navPages ? $attrs.navPages : 7;
   $scope.nav_adjacent = $attrs.navAdjacent ? $attrs.navAdjacent : 2; //#TODO make dynamic in NanoPaging_sample.htm
   
   // Desclare variables
   $scope.tot_pages;
   $scope.tot;
   
   
   // Initiate and get total elements from the webservice-tot
   $scope.load = function () {
      $scope.load_error = false;
      $scope.first_call = true;
      $scope.loading = true;
      $scope.rows = [];
      
      $http.post($attrs.webserviceTot, {
         params: {}
      }).then(function (response) {
         var data = response.data;
         if (data.success) {
            $scope.tot = data.tot;
            $scope.tot_pages = Math.ceil($scope.tot / $scope.show);
            if ($scope.page < 1 || $scope.tot_pages) {
               $scope.page = 1;
            }
            $scope.show_page($scope.page);
         } else {
            if (data.fallback_url) {
               window.location.href = data.fallback_url;
            } else {
               $scope.load_error = true;
            }
         }
      }, function () {
         $scope.load_error = true;
      });
   }
   
   // Return array from number to use in ng-repeat
   $scope.getNumber = function (n) {
      var ar = [];
      for (var i = 0; i < n; i++) {
         ar.push(i + 1);
      }
      return ar;
   }
   
   // Set number of rows per page
   $scope.change_show = function (show) {
      $scope.show = show;
      $scope.load();
   }
   
   // Go to page
   $scope.show_page = function (page) {
      if (page < 1 || page > $scope.tot_pages) {
         return;
      }
      $scope.page = page;
      
      // Set the page number in the url
      $location.search({
         page: $scope.page
      });
      $scope.loading = true;
      $scope.rows = [];
      $http.post($attrs.webservicePaging, {
         params: {
            page: page,
            show: $scope.show
         }
      }).then(function (response) {
         var data = response.data;
         if (data.success) {
            $scope.rows = data.rows;
            $scope.loading = false;
            $scope.first_call = false;
         } else {
            $scope.load_error = true;
         }
      }, function () {
         $scope.load_error = true;
      });
   }
   
   // Start
   $scope.load();
});