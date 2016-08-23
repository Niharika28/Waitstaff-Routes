angular.module("myApp", ['ngMessages'])
    .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/home', {
                    templateUrl: 'home.html',
                    controller: 'HomeCtrl'
                }).when('/newMeal', {
                    templateUrl: 'newMeal.html',
                    controller: 'NewMealCtrl'
                }).when('/myEarning', {
                    templateUrl: 'myEarnings.html',
                    controller: 'MyEarningsCtrl'
                }).when('/error', {
                    template: '<p>Error Page Not Found</p>'
                })
                .otherwise('/error');
        }])
    .controller('HomeCtrl',function(){
        // home controller
    })
    .controller('WaitStaffCtrl', function() {
            var vm = this;
            vm.subTotal = 0.00;
            vm.tip = 0.00;
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
            }

            vm.cancelMealData = function() {
                vm.mealPrice = '';
                vm.taxRate = '';
                vm.tipPercent = '';
            }

            vm.resetData = function() {
                vm.myForm.$setPristine();
                vm.myForm.$setUntouched();
                vm.mealPrice = '';
                vm.taxRate = '';
                vm.tipPercent = '';
                vm.subTotal = 0.00;
                vm.tip = 0.00;
                vm.total = 0.00;
                vm.tipTotal = 0.00;
                vm.numberOfMeals = 0;
                vm.averageTip = 0.00;
            }

        });
