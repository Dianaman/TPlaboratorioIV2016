angular.module("salaDeJuegosApp");

salaApp.controller("LoginCtrl", function($scope, $auth, SrvAuth, UsuarioActual, $rootScope){
	$scope.usuario = {};

	$scope.enviarDatos = function(){
		var user = JSON.stringify($scope.usuario);

		SrvAuth.logear(user)
		.then(function(respuesta){
			var u = respuesta.data;
			UsuarioActual.login(u.id, u.nombre, u.correo, u.tipo);

			$rootScope.$emit('login');
		})
		.catch(function(error){
			console.error(error);
		})
	}	

	$scope.LoginAsAdmin = function(){
		$scope.user = {
			email: 'admin@admin.com',
			clave: '321'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			var u = respuesta.data;
			UsuarioActual.login(u.id, u.nombre, u.correo, u.tipo);

			$rootScope.$emit('login');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsComp = function(){
		$scope.user = {
			email: 'comp@comp.com',
			clave: '123'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			var u = respuesta.data;
			UsuarioActual.login(u.id, u.nombre, u.correo, u.tipo);

			$rootScope.$emit('login');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsVend = function(){
		$scope.user = {
			email: 'vend@vend.com',
			clave: '321'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			var u = respuesta.data;
			UsuarioActual.login(u.id, u.nombre, u.correo, u.tipo);

			$rootScope.$emit('login');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsEnc = function(){
		$scope.user = {
			email: 'enc1@encargados.com',
			clave: '111111'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			var u = respuesta.data;
			UsuarioActual.login(u.id, u.nombre, u.correo, u.tipo);

			$rootScope.$emit('login');
		})
		.catch(function(error){
			console.error(error);
		})
	}


	 $scope.authenticate = function(provider) {
      $auth.authenticate(provider);

      $state.go('menu');
    };
});


salaApp.controller("SigninCtrl", function($scope){
	
});
