angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/home', {
                    templateUrl: './home.html',
                    controller: 'HomeCtrl',
                    controllerAs : 'vm'
                }).when('/newMeal', {
                    templateUrl: 'newMeal.html',
                    controller : 'NewMealCtrl',
                    controllerAs: 'vm'
                }).when('/myEarning', {
                    templateUrl: 'myEarnings.html',
                    controller : 'MyEarningCtrl',
                    controllerAs: 'vm'
                }).when('/error', {
                    template: '<p>Error Page Not Found</p>'
                })
                .otherwise('/error');
        }])
    .factory('commonService', function(){
         var data = this;
         data.setDefaults = function(){

         }
         data.sendData = function(tipTotal,numberOfMeals,averageTip) {
             data.tipTotal = tipTotal;
             data.numberOfMeals = numberOfMeals;
             data.averageTip = averageTip;
         };
         data.getData = function() {
             return data;
         };
         data.setForm = function(myForm){
            data.myForm = myForm;
         };

         data.getForm = function () {
             return data.myForm;
         }
        return data;
    })
    .controller('HomeCtrl',function(){
        // home controller
    })
    .controller('NewMealCtrl',['commonService',function(commonService){
        var vm = this;
        vm.subTotal = 0.00;
        vm.tip = 0;
        vm.total = 0.00;
        vm.tipTotal = 0.00;
        vm.numberOfMeals = 0;
        vm.averageTip = 0.00;
         vm.calculateCustomerCharges = function() {
                vm.subTotal = vm.mealPrice + ((vm.mealPrice * vm.taxRate) / 100);
                vm.tip = ((vm.subTotal * vm.tipPercent) / 100);
                vm.total = vm.subTotal + vm.tip;
                vm.tipTotal = vm.tipTotal + vm.tip;
                vm.numberOfMeals = vm.numberOfMeals + 1;
                vm.averageTip = vm.tipTotal / vm.numberOfMeals;
                commonService.sendData(vm.tipTotal,vm.numberOfMeals,vm.averageTip);
                commonService.setForm(vm.myForm);
            }

             vm.cancelMealData = function() {
                vm.mealPrice = '';
                vm.taxRate = '';
                vm.tipPercent = '';
            }
    }])
    .controller('MyEarningCtrl', ['commonService', function(commonService) {
            var vm = this;
            var data = commonService.getData();
                vm.tipTotal = data.tipTotal;
                vm.numberOfMeals = data.numberOfMeals;
                vm.averageTip = data.averageTip;
           

            vm.resetData = function() {
               commonService.getForm().$setPristine();
                commonService.getForm().$setUntouched();
                commonService.sendData(0.00,0.00,0.00);
                var data = commonService.getData();
                vm.mealPrice = '';
                vm.taxRate = '';
                vm.tipPercent = '';
                vm.subTotal = 0.00;
                vm.tip = 0.00;
                vm.total = 0.00;
                vm.tipTotal = data.tipTotal;
                vm.numberOfMeals = data.numberOfMeals;
                vm.averageTip = data.averageTip;
            }

        }]);
