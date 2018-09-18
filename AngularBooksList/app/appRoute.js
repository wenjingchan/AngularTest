//定义主模块，并进行依赖注入
angular.module("bookApp",['ngRoute']);

//定义路由
angular.module("bookApp").config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/book/list',{
		templateUrl:'tmpl/book/list.html',
		controller:bookListCtrl
	}).when('/book/add',{
		templateUrl:'tmpl/book/add.html',
		controller:bookAddCtrl
	}).when('/book/detail/:bookId/:bookName',{
		templateUrl:'tmpl/book/detail.html',
		controller:bookVoteCtrl
	}).when('/book/edit/:bookId',{
		templateUrl:'tmpl/book/edit.html',
		controller:bookEditCtrl
	}).otherwise({
		redirectTo: '/book/list'//相当于default，默认显示
	});
}]);