angular.module("salaDeJuegosApp");


salaApp.controller("PersonaAltaCtrl", function($scope, $state, FileUploader, SrvUsuarios, SrvLocales, $stateParams, $timeout){

	$scope.persona = {
		nombre: 'Floor Jansen',
		correo: 'floor.jansen@mail.com',
		clave: '123456',
		tipo: 'comprador',
		foto: '',
		habilitado: true,
		id_sucursal: 1
	};
	
	$scope.modo = ($stateParams.id ? 'Modificar' : 'Agregar')

	SrvLocales.traerTodas()
	.then(function(response){
		$scope.sucursales = response.data;
		$scope.persona.id_sucursal.value = 1;

		if($stateParams.id){
			$scope.id = JSON.parse($stateParams.id);

			SrvUsuarios.traerUno($scope.id)
			.then(function(response){
				console.info(response.data)
				$scope.persona = response.data;
			}, function(error){
				console.error(error);
			})
		}
	}, function(error){
		console.error(error)
	})



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

		if($scope.modo == 'Agregar'){
			SrvUsuarios.insertarUsuario(datost)
			.then(function(response){
				console.info(response);

				$state.go('personas');
			}, function errorCallback(response){
				console.error(response);
			});
		} else {
			SrvUsuarios.modificarUsuario(datost)
			.then(function(response){
				console.info(response);

				$state.go('personas');
			}, function errorCallback(response){
				console.error(response);
			});
		}
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

		SrvUsuarios.borrarUsuario(dato)
		.then(function(response){
			console.info(response);
			console.info($scope.personas);
			console.info(selectedIndex);

			$scope.personas.splice($scope.personas.indexOf(selectedIndex), 1);
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
