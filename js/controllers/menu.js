angular.module("salaDeJuegosApp");

salaApp.controller("MenuCtrl", function($scope, $state, $http, SrvProductos){
	$scope.pizzas = [];

	SrvProductos.traerTodos().then(function(respuesta){
		console.log(respuesta)
		$scope.pizzas = respuesta.data;
	}).catch(function (error){
		console.error('error', error);
	});

	$scope.selectPizza = function(pizza){
		$state.go('menu-pizza', {pizzaid: pizza.id});
	}
});

salaApp.controller("MenuPizzaCtrl", function($stateParams, $scope, $http, SrvProductos){
	$scope.pizza;
	
	console.log($stateParams.pizzaid);


	SrvProductos.traerUno($stateParams.pizzaid).then(
		function(response){
			console.log(response);
			$scope.pizza = response.data;
		}, function errorCallback(response){
			alert('Ocurrió un error, inténtelo más tarde');
			console.error(response);
		});

	$scope.addCart = function(){

	}
});