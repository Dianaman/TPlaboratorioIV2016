angular.module("salaDeJuegosApp");

salaApp.controller("LoginCtrl", function($scope, $auth, SrvAuth, UsuarioActual, $rootScope, $state){
	$scope.usuario = {};

	$scope.enviarDatos = function(){
		var user = JSON.stringify($scope.usuario);

		SrvAuth.logear(user)
		.then(function(respuesta){
			console.log(respuesta);
			var u = respuesta.data;
			UsuarioActual.login(u);

			$rootScope.$emit('login');
			$state.go('menu.todos');
		})
		.catch(function(error){
			console.error(error);
		})
	}	

	$scope.LoginAsAdmin = function(){
		$scope.user = {
			correo: 'admin@admin.com',
			clave: '321'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			console.log(respuesta);
			var u = respuesta.data;
			UsuarioActual.login(u);

			$rootScope.$emit('login');
			$state.go('locales');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsComp = function(){
		$scope.user = {
			correo: 'comp@comp.com',
			clave: '123'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			console.log(respuesta);
			var u = respuesta.data;
			UsuarioActual.login(u);

			$rootScope.$emit('login');
			$state.go('menu.todos');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsVend = function(){
		$scope.user = {
			correo: 'vend@vend.com',
			clave: '321'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			console.log(respuesta);
			var u = respuesta.data;
			UsuarioActual.login(u);

			$rootScope.$emit('login');
			$state.go('pedidos');
		})
		.catch(function(error){
			console.error(error);
		})
	}

	$scope.LoginAsEnc = function(){
		$scope.user = {
			correo: 'enc1@encargados.com',
			clave: '111111'
		};
		var user = JSON.stringify($scope.user);

		SrvAuth.logear(user)
		.then(function(respuesta){
			console.log(respuesta);
			var u = respuesta.data;
			UsuarioActual.login(u);

			$rootScope.$emit('login');
			$state.go('productos');
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


salaApp.controller("UsuarioAltaCtrl", function($scope, $state, FileUploader, SrvUsuarios, SrvLocales, UsuarioActual, $stateParams, $timeout){

	$scope.persona = {
		nombre: 'Floor Jansen',
		correo: 'floor.jansen@mail.com',
		clave: '123456',
		tipo: 'comprador',
		foto: 'anime-y-yo.png',
		habilitado: true,
		id_sucursal: 1
	};
	
	$scope.nuevocliente = !UsuarioActual.getCargo() ? true : false;
	$scope.modo = ($stateParams.id ? 'Modificar' : 'Agregar')

	SrvLocales.traerTodas()
	.then(function(response){
		$scope.sucursales = response.data;
		$scope.persona.id_sucursal = 1;

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

	$scope.SubidorDeArchivos=new FileUploader({url:SrvLocales.traerUrlFotos()});
  	$scope.SubidorDeArchivos.queueLimit = 3;

    $scope.SubidorDeArchivos.onCompleteAll = function() {
		$scope.sucursal.foto = $scope.SubidorDeArchivos.queue[0];

    	$scope.enviarDatos();
    };

	$scope.enviarDatos = function(){
		var datost = JSON.stringify($scope.persona);

		if($scope.modo == 'Agregar'){
			SrvUsuarios.insertarUsuario(datost)
			.then(function(response){
				console.info(response);

				$state.go('usuario.grilla');
			}, function errorCallback(response){
				console.error(response);
			});
		} else {
			SrvUsuarios.modificarUsuario(datost)
			.then(function(response){
				console.info(response);

				$state.go('usuario.grilla');
			}, function errorCallback(response){
				console.error(response);
			});
		}
	}


	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/Archivos.php'});
	$scope.SubidorDeArchivos.onSuccessItem = function(item, response, status, headers){

	}


});

salaApp.controller("UsuarioGrillaCtrl", function($scope, SrvUsuarios, SrvEncuestas, $state, UsuarioActual){

    if(!UsuarioActual.getCargo()){
        $state.go('usuario.login');
    } else if(UsuarioActual.getCargo() == 'comprador'){
    	$state.go('menu.todos');
    }

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
		$state.go('usuario.alta', {id:idParam});

	}

	$scope.irAgregar = function(){
		$state.go('usuario.alta');
	}

	$scope.enviarEncuesta = function(usuario){
		SrvUsuarios.modificarEstadoEncuesta(usuario.id, 'pendiente')
		.then(function(response){
			console.log(response);
		}).catch(function(error){
			console.error(error);
		})
	}

	$scope.verEncuesta = function(usuario){
		console.log(usuario);

		SrvEncuestas.traerUna(usuario.id)
		.then(function(response){
			console.log(response);

			$scope.UsuarioParaMostrar = usuario;
			$scope.EncuestaParaMostrar = response.data;
			document.getElementById("id01").style.display = "block";
		}).catch(function(error){
			console.error(error);
		})
	}
});
