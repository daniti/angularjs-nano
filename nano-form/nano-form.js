// Create the NanoForm controller
Nano.controller('NanoForm', function ($scope, $http, $attrs) {

   // Set initial values
   $scope.form = {
      fields: [],
      changed: false,
      saved: false
   };

   // Load the form from the 'get' webservice
   $scope.load = function () {
      $http.post($attrs.webserviceGet, {
         params: {}
      }).then(function (response) {
         var data = response.data;
         if (data.success) {
            $scope.form.title = data.title;
            $scope.form.fields = data.fields;
            $scope.form.submit_label = data.submit_label;
            $scope.form.submit_showalways = data.submit_showalways;
         } else {
            $scope.form.load_error = true;
         }
      }, function () {
         $scope.form.load_error = true;
      });
   }

   // Reset feedback for all or just one field
   $scope.reset_feedbacks = function (field) {
      field = typeof field == "undefined" ? false : field;
      for (var i = 0; i < $scope.form.fields.length; i++) {
         if (!field || $scope.form.fields[i].name == field) {
            $scope.form.fields[i].changed = $scope.form.fields[i].name == field;
            $scope.form.fields[i].saved = false;
            $scope.reset_errors($scope.form.fields[i]);
            if ($scope.form.fields[i].name == field) {
               return;
            }
         }
      }
   }

   // Reset errors
   $scope.reset_errors = function (field) {
      field.error = false;
      field.error_msg = null;
   }

   // Set field success
   $scope.field_success = function (field) {
      field.changed = false;
      field.saved = true;
      field.error = false;
      field.error_msg = null;
   }

   // When changing an input, reset feedbacks and set form to changed
   $scope.change = function (field) {
      $scope.reset_feedbacks(field);
      $scope.form.changed = true;
      $scope.form.saved = false;
   }

   // Submit the form and set feedback
   $scope.submit = function () {
      var params = {};

      // Populate the parameters object
      for (var i = 0; i < $scope.form.fields.length; i++) {
         params[$scope.form.fields[i].name] = $scope.form.fields[i].value;
      }

      $http.post($attrs.webserviceSubmit, {
         params: params
      }).then(function (response) {

         // Reset feedbacks
         $scope.form.load_error = false;

         // Reset error messages
         for (var j = 0; j < $scope.form.fields.length; j++) {
            $scope.reset_errors($scope.form.fields[j]);
         }

         var data = response.data;

         if (data.success) {
            for (var i = 0; i < $scope.form.fields.length; i++) {
               if ($scope.form.fields[i].changed) {
                  $scope.reset_errors($scope.form.fields[i]);
                  $scope.form.fields[i].saved = true;
               }
            }
            $scope.form.changed = false;
            $scope.form.saved = true;

            // Show the aftersubmit if there is one
            if (data.aftersubmit) {
               $scope.form.aftersubmit = data.aftersubmit;
            }
         } else {
            if (data.errors) {

               // Assign each error to the specific field
               for (var i = 0; i < data.errors.length; i++) {
                  for (var j = 0; j < $scope.form.fields.length; j++) {
                     if ($scope.form.fields[j].name == data.errors[i].field) {
                        $scope.form.fields[j].error = true;
                        $scope.form.fields[j].error_msg = data.errors[i].message;
                     }
                  }
               }
            } else {
               $scope.form.load_error = true;
            }
         }
      }, function () {

         // Something wrong with the webservice: show message
         $scope.form.load_error = true;
      });
   }

   // Handle she 'showif' parameter.
   $scope.check_show_field = function (showif) {
      if (!showif) {
         return true;
      } else {
         for (var i = 0; i < $scope.form.fields.length; i++) {
            if ($scope.form.fields[i].name == showif.field) {
               var res = false;
               switch (showif.condition) {
                  case '!=':
                     res = $scope.form.fields[i].value != showif.value;
                     break;
                  case '==':
                     res = $scope.form.fields[i].value == showif.value;
                     break;
                  case '<':
                     res = $scope.form.fields[i].value < showif.value;
                     break;
                  case '>':
                     res = $scope.form.fields[i].value > showif.value;
                     break;
                  case '<=':
                     res = $scope.form.fields[i].value <= showif.value;
                     break;
                  case '>=':
                     res = $scope.form.fields[i].value >= showif.value;
                     break;
                  case 'isset':
                     if ($scope.form.fields[i].value) {
                        res = true;
                     } else {
                        res = false;
                     }
                     break;
               }
               return res;
            }
         }
      }
      return true;
   }

   // Start
   $scope.load();
});