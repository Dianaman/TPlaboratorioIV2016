angular.module("salaDeJuegosApp");

salaApp.controller("MainCtrl", function($scope, UsuarioActual, $rootScope, $state){
	$scope.usuario = {};

	$rootScope.$on('login', function(event, data){
		$scope.usuario.tipo = UsuarioActual.getCargo();
		$scope.usuario.estadoencuesta = UsuarioActual.getEstadoEncuesta();
		if($scope.usuario.tipo != '' && $scope.usuario.tipo != undefined){
			$scope.usuario.loggeado = true;

			console.log($scope.usuario);
		}
	});

	$rootScope.$on('logout', function(event, data){
		UsuarioActual.logout();
		$scope.usuario = {};

		$scope.usuario = {
		  	nombre: '',
		  	tipo: '',
			loggeado:false
		};
	})
	
	$scope.Salir = function(){
		$rootScope.$emit('logout');

		$state.go('usuario.login');
	}
});

