angular.module("salaDeJuegosApp");


salaApp.controller("PersonaAltaCtrl", function($scope, $state, FileUploader, SrvUsuarios, $stateParams, $timeout){

	$scope.persona = {
		nombre: 'Floor Jansen',
		email: 'floor.jansen@mail.com',
		clave: '123456',
		cargo: 'comprador',
		foto: '',
		habilitado: true
	};
	
	$scope.modo = ($stateParams.id ? 'Modificar' : 'Agregar')

	if($stateParams.id){
		$scope.id = JSON.parse($stateParams.id);
	}


	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/nexo.php'});

    $scope.SubidorDeArchivos.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.persona.foto = fileItem;
    };
	
	$scope.SubidorDeArchivos.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };

	$scope.enviarDatos = function(){
		var datost = JSON.stringify($scope.persona);

		SrvUsuarios.insertarUsuario(datost)
		.then(function(response){
			console.info(response);

			$state.go('usuario.login');
		}, function errorCallback(response){
			console.info(response);
		});
	}


	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/Archivos.php'});
	$scope.SubidorDeArchivos.onSuccessItem = function(item, response, status, headers){

	}


});

salaApp.controller("PersonaGrillaCtrl", function($scope, SrvUsuarios, $state){
	SrvUsuarios.traerTodos()
	.then(function(response){
		$scope.personas = response.data;
	}, function errorCallback(response){
		console.info(response);
	});

	$scope.borrarPersona = function(selectedIndex){
		var dato = JSON.stringify(selectedIndex.id);

		$http.delete('http://localhost/ws1/usuario/'+ dato)
		.then(function(response){
			console.info(response);

		}, function errorCallback(response){
			console.info(response);
		});
	}

	$scope.modificarPersona = function(selectedIndex){
		var idParam = JSON.stringify(selectedIndex.id);
		$state.go('personas-alta', {id:idParam});

	}

	$scope.irAgregar = function(){
		$state.go('personas-alta');
	}
});
