angular.module("salaDeJuegosApp");

salaApp.controller("MainCtrl", function($scope, UsuarioActual, $rootScope){
	$scope.usuario = {};

	$rootScope.$on('login', function(event, data){
		$scope.usuario.tipo = UsuarioActual.getCargo();
		if($scope.usuario.tipo != '' && $scope.usuario.tipo != undefined){
			$scope.usuario.loggeado = true;

			console.log($scope.usuario);
		}
	});
	
});


