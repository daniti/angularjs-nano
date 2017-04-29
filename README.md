# Nano
### Tiny and handy AngularJS components
*Requires AngularJS 1.5 and Bootstrap.*
You currently find two components in the repository:
- Nano Form
- Nano Paging

## Nano Form
Nano Form lets you create instant forms from a json file or webservice.
Include the **nano.js** and **nano-form.js** files:
```html
<script src="§/nano.js"></script>
<script src="§/nano-form/nano-form.js"></script>
```
Instanciate your app injecting the Nano module:
```javascript
var app = angular.module("YourApp", ['Nano']);
```
and attach the NanoForm controller to any form inside your app, like this:
```html
<div ng-app="YourApp">
    <form role="form" ng-controller="NanoForm" webservice-get="your-get-webservice.json" webservice-submit="your-submit-webservice.php" ng-submit="submit()">
        <div ng-include src="'§/nano-form/nano-form.htm'"></div>
    </form>
</div>
```
As you can see, it requires `ng-submit="submit()"` and a couple self-explanatory attributes:
`webservice-get`: Where to look for the json file to create the form from.
`webservice-submit`: Where to send the form data and read feedbacks from.
### webservice-get
Nano Form expects this to be a json (coming either from a pure json file or a webservice) like this:
```json
{
   "success": true,
   "title": "Form title",
   "fields": [{
         "name": "inputname",
         "label": "Input label",
         "type": "select",
         "placeholder": "Your placeholder",
         "value": "Foo",
         "options": [{
               "label": "Option label",
               "value": "optionvalue"
            }],
         "showif": {
            "field": "anotherinput",
            "condition": "==",
            "value": "Bar"
         }
      }],
   "submit_label": "Send",
   "submit_showalways": true
}
```
`success`: Webservice success. If false, an error message is displayed instead of the form.
`title`: The title of the form.
`fields`: Array containing the inputs.
`fields[i].name`: Input name.
`fields[i].label`: Input label.
`fields[i].type`: Input type. Accepts: `text`,`number`,`checkbox`,`select`,`radio`.
`fields[i].placeholder`: Input placeholder.
`fields[i].options`: Label/Value array of options for radio and select inputs.
`fields[i].showif`: If present, the input is shown only when a certain condition is verified, expressed through the `field`,`condition`,`value` parameters.
`submit_label`: Submit button label.
`submit_showalways`: If false, the submit button is only shown when a field is changed.
### webservice-submit
Nano Form will send the form data to this webservice, through an object like this:
`{params: {inputname: inputvalue, inputname2: inputvalue2}}`
And will expect a json response that will look like (in case of success):
```json
{
   "success": true,
   "aftersubmit": {
      "message": "Form submit successful",
      "buttons": [{
            "label": "Back to list",
            "type": "primary",
            "href": "list.htm"
         }, {
            "label": "Do something else",
            "type": "secondary",
            "href": "somethingelse.htm"
         }]
   }
}
```
The `aftersubmit` parameter is **optional**, and will display a message and a series of buttons after the form submit. If left empty, the feedback will appear as check ticks under the modified inputs.
If there are validation errors (that will be provided by the webservice), the response will look like:
```json
{
   "success": false,
   "errors": [{
         "field": "somerequiredfield",
         "message": "The field cannot be empty"
      }, {
         "field": "anotherinput"
      }]
}
```
The `message` attribute is optional. If not provided, an error icon will be shown instead of the message.
Please note that you should **always include the error properties for unsuccessful submits**. If `success` is set to false but no errors are provided, it will be interpreted as a submit error and not as a validation error.
Don't forget to include the nano-form.htm file with:
```html
<div ng-include src="'§/nano-form/nano-form.htm'"></div>
```
## Nano Paging
Nano Paging can save you time when you need basic paging.
Just like Nano Form, include the necessary file after `nano.js`. This time:
```html
<script src="§/nano-paging/nano-paging.js"></script>
```
Instanciate your app injecting the Nano module, and then use the `NanoPaging` controller anywhere inside your app, like this:
```html
<div role="form" ng-controller="NanoPaging" webservice-tot="mock_webservices/mock_nano_paging_tot.php" webservice-paging="mock_webservices/mock_nano_paging.php" show="10">
    <div ng-include src="'../nano-paging/nano-paging-nav.htm'"></div>
    <div ng-show="loading">Loading...</div>
    <p ng-repeat="r in rows">
       {{r.label}}
    </p>
 </div>
```
## webservice-tot
Will provide a json response with the total number of elements to show, which will look like this:
```json
{"success":true,"tot":36}
```
## webservice-paging
Will be called when showing a page, with the parameters `show` and `page`, and will expect the following response:
```json
{
   "success": true,
   "rows": [{
         "label": "Row number 1",
         "link": "#"
      }, {
         "label": "Row number 2",
         "link": "#"
      }, {
         "label": "Row number 3",
         "link": "#"
      }]
}
```
You can include the pagination anywhere you prefer and a `loading` parameter is provided in case you need to use it.
You can cicle through the rows inside the controller in any way you prefer, for example:
```html
<p ng-repeat="r in rows"><a href="{{r.link}}">{{r.label}}</a></p>
```
---
##### Happy coding!