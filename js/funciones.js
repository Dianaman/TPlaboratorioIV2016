var salaApp = angular.module("salaDeJuegosApp", ['ui.router', 'angularFileUpload', 'satellizer']);

salaApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	$authProvider.loginUrl = 'SalaDeJuegos/servidor/jwt/php/auth.php';
	$authProvider.tokenName = 'SalaDeJuegosToken';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authHeader = 'data';

	$authProvider.github({
	  url: '/usuario/login',
	  authorizationEndpoint: 'http://github.com/login',
	  redirectUri: window.location.origin,
	  optionalUrlParams: ['login_field'],
	  login_field: ['login:diana.man.91@gmail.com'],
	  scopeDelimiter: ' ',
	  oauthType: '2.0',
	  popupOptions: { width: 1020, height: 618 }
	});


	$stateProvider
		.state(
			"persona", {
				url: '/persona',
				abstract: true,
				templateUrl: 'templates/persona/persona.html'
			})
		.state(
			"persona.menu", {
				url: '/menu',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-menu.html',
						controller: 'PersonaMenuCtrl'
					}
				}
			})
		.state(
			"persona.alta", {
				cache:false,
				url: '/alta/:id',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-alta.html',
						controller: 'PersonaAltaCtrl'
					}
				}
			})
		.state(
			"persona.grilla", {
				url: '/grilla',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-grilla.html',
						controller: 'PersonaGrillaCtrl'
					}
				}
			})
		.state(
			"usuario", {
				url: '/usuario',
				abstract: true,
				templateUrl: 'templates/usuario/usuario.html'
			})

		.state(
			"usuario.login", {
				url: '/login',
				views:{
					"content": {
						templateUrl: 'templates/usuario/login.html',
						controller: 'LoginCtrl'
					}
				}
			})

		.state(
			"usuario.signin", {
				url: '/signin',
				views:{
					"content": {
						templateUrl: 'templates/usuario/signin.html',
						controller: 'SigninCtrl'
					}
				}
			})

		.state(
			"menu", {
				url: '/menu',
				templateUrl: 'templates/menu.html',
				controller: 'MenuCtrl'	
			})

		.state(
			"menu-pizza", {
				url: '/menu/:pizza',
				templateUrl: 'templates/menu-pizza.html',
				controller: 'MenuPizzaCtrl'	
			})

		.state(
			"locales", {
				url: '/locales',
				templateUrl: 'templates/locales/local-lista.html',
				controller: 'LocalesCtrl'	
			})

		.state(
			"local-alta", {
				url: '/locales/alta',
				templateUrl: 'templates/locales/local-alta.html',
				controller: 'LocalAltaCtrl'	
			})

		.state(
			"pedidos", {
				url: '/pedidos',
				templateUrl: 'templates/pedidos/pedido-lista.html',
				controller: 'PedidosCtrl'	
			})

		.state(
			"pedido-alta", {
				url: '/pedidos/alta',
				templateUrl: 'templates/pedidos/pedido-alta.html',
				controller: 'PedidoAltaCtrl'	
			})

		.state(
			"ofertas", {
				url: '/ofertas',
				templateUrl: 'templates/ofertas/oferta-lista.html',
				controller: 'OfertasCtrl'	
			})

		.state(
			"oferta-alta", {
				url: '/ofertas/alta',
				templateUrl: 'templates/ofertas/oferta-alta.html',
				controller: 'OfertaAltaCtrl'	
			})

		$urlRouterProvider.otherwise("/persona/menu");
		
});

salaApp.run(function($rootScope, $state){
  $rootScope.usuario = {
  	nombre: '',
  	tipo: '',
  	loggeado:true
  };

  $rootScope.IrAMenu = function(){
  	$state.go('menu');
  }

});

salaApp.controller("MenuCtrl", function($scope, $state, $http, SrvProductos){
	$scope.pizzas = [
		{
			id: 0001,
			title: 'Pizza de Muzarella',
			desc: 'Queso muzzarella, salsa de tomate, oregano y aceitunas',
			img: 'img/muzzarella.jpg'
		},
		{
			id: 0002,
			title: 'Pizza Napolitana',
			desc: 'Queso muzzarella, salsa de tomate, tomates en rodajas, oregano, ajo y aceitunas',
			img: 'img/napolitana.jpg'
		},
		{
			id: 0003,
			title: 'Fainá',
			desc: 'Masa con harina de garbanzos',
			img: 'img/faina.jpg'
		}
	];
/*
	$http.get('http://localhost/ws2/pizza').then(function(response){
		var arrpizzas = [];
		$scope.pizzas = [];
		
		for(var i=0; i< response.data.length; i++)
		{
			var title = response.data[i].tipo + ' ' + response.data[i].nombre;

			if(arrpizzas.indexOf(title)<=-1){
				var pizza = {
					title: title,
					nombre: response.data[i].nombre,
					tipo: response.data[i].tipo,
					desc: 'asdsadad'
				}
				arrpizzas.push(title);
				$scope.pizzas.push(pizza);
			}
		}


	}, function errorCallback(response){
		console.error(response);
	});*/

	SrvProductos.traerTodos().then(function(respuesta){
		$scope.pizzas = respuesta.data;
	}).catch(function (error){
		console.error('error', error);
	});

	$scope.selectPizza = function(pizza){
		var unaPizza = JSON.stringify(pizza);
		$state.go('menu-pizza', {pizza: unaPizza});
	}
});

salaApp.controller("MenuPizzaCtrl", function($stateParams, $scope, $http){
	$scope.pizza;
	
	var tipo = JSON.parse($stateParams.pizza);
	console.log(tipo);

	var param = {
		tipo: tipo.tipo,
		nombre: tipo.nombre
	}

	$http.get('http://localhost/ws2/pizza/tipo/' + JSON.stringify(param)).then(
		function(response){
			console.log(response);
			$scope.pizza = response.data;
		}, function errorCallback(response){
			alert('Ocurrió un error, inténtelo más tarde');
			console.error(response);
		});

	$scope.addCart = function(){

	}
})

salaApp.controller("PersonaMenuCtrl", function($scope, $state){
	$scope.irAAlta = function(){
		$state.go('persona.alta');
	}

	$scope.irAGrilla = function(){
		$state.go('persona.grilla');
	}
});

salaApp.controller("PersonaAltaCtrl", function($scope, $state, FileUploader, $http, $stateParams, $timeout){

	$scope.persona = {
		apellido: 'Jansen', 
		nombre: 'Floor',
		email: 'floor.jansen@mail.com',
		edad: 35,
		estado: 'Soltero',
		sexo: 'Femenino',
		dni:9443556,
		nacimiento: new Date(1984, 05, 11, 0, 0, 0, 0),
		foto: ''
	};
	
	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/nexo.php'});

    $scope.SubidorDeArchivos.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.persona.foto = fileItem;
    };
	
	$scope.SubidorDeArchivos.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };

	if($stateParams.id != ""){
		$scope.id = JSON.parse($stateParams.id);
	}

	$scope.enviarDatos = function(){
		var datost = JSON.stringify($scope.persona);

		$http.post('http://localhost/ws1/usuario/'+ datost)
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

salaApp.controller("PersonaGrillaCtrl", function($scope, $http, $state){
	$http.get('http://localhost/ws1/usuarios')
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
/*
	$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];
	*/

	$scope.modificarPersona = function(selectedIndex){
		var idParam = JSON.stringify(selectedIndex.id);
		$state.go('persona.alta', {id:idParam});

	}

	/*$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];*/
});

salaApp.controller("LoginCtrl", function($scope, $auth){
	 $scope.authenticate = function(provider) {
      $auth.authenticate(provider);

      $state.go('menu');
    };
});

salaApp.controller("SigninCtrl", function($scope){
	
});

salaApp.controller('LocalesCtrl', function($scope, $state, $timeout, SrvLocales, SrvUsuarios){

	$scope.titulo = "Listado de Sucursales";


    $scope.ListaSucursales = [];

    $scope.SucursalParaMostrar = {
    	nombre : "NOMBRE",
    	localidad : "LOCALIDAD",
        foto1 : "placeholder1.png",
        foto2 : "placeholder1.png",
        foto3 : "placeholder1.png"
    };

    $scope.SucursalParaModificar = {};

    $scope.EncargadoParaMostrar = {
        nombre : "NOMBRE",
        email: "MAIL"
    };

    $scope.MostrarSucursal = function(sucursal){
        $scope.SucursalParaMostrar = sucursal;
        console.log("MI SUCURSAL", $scope.SucursalParaMostrar);
        document.getElementById('id01').style.display='block';
    };

    $scope.MostrarOfertas = function(sucursal){
        $scope.SucursalParaMostrar = sucursal;
        //console.log("MI SUCURSAL", $scope.SucursalParaMostrar);
        document.getElementById('id04').style.display='block';
    };

    $scope.MostrarEncargado = function(idSucursal){
        console.log("MI Encargado ANTES", $scope.EncargadoParaMostrar);
        SrvUsuarios.traerUnoPorSucursal(idSucursal)
            .then(function (respuesta){
                console.info("Encargado encontrado", respuesta);
                $scope.EncargadoParaMostrar = respuesta.data;
                console.log("MI Encargado DESPUES", $scope.EncargadoParaMostrar);
                document.getElementById('id02').style.display='block';
            }).catch(function (error){

                $scope.EncargadoParaMostrar = {
                    nombre : "NOMBRE",
                    email: "MAIL"
                };

            })

    };

    $scope.ModificarSucursal = function(sucModif){
        $scope.SucursalParaModificar = sucModif;
        document.getElementById('id03').style.display='block';
    };

    $scope.RealizarModificacion = function(){
        var jsonModif = JSON.stringify($scope.SucursalParaModificar);
        SrvLocales.modificarSucursal(jsonModif)
            .then(function (respuesta){
                $timeout(function(){
                    console.info(respuesta);
                    document.getElementById('id03').style.display='none';
                },100);
            }).catch(function (error){

                console.info("Error", error);

            })
    }

    $scope.CancelarModificacion = function(){
        $scope.ListaSucursales = [];
        SrvLocales.traerTodas()
        .then(function (respuesta){

            console.info("todas las sucursales", respuesta);
            $scope.ListaSucursales = respuesta.data;

        }).catch(function (error){

            $scope.ListaSucursales = [];

        })
    };

    SrvLocales.traerTodas()
    	.then(function (respuesta){

    		console.info("todas las sucursales", respuesta);
        $scope.ListaSucursales = respuesta.data;

    	}).catch(function (error){

    		$scope.ListaSucursales = [];

    	})

});

salaApp.controller('LocalAltaCtrl', function($scope, $state, $timeout,UsuarioActual,FileUploader,SrvLocales){
	
	$scope.SubidorDeArchivos=new FileUploader({url:SrvLocales.traerUrlFotos()});
  	$scope.SubidorDeArchivos.queueLimit = 3;

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.sucursal = {};
	$scope.sucursal.encargado = 0;
	$scope.sucursal.foto1 = "sin foto";
	$scope.sucursal.foto2 = "sin foto";
	$scope.sucursal.foto3 = "sin foto";


	$scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers)
	  {
		console.info("Ya guardé el archivo.", item, response, status, headers);
	  };

	  $scope.SubidorDeArchivos.onCompleteAll =function()
	  {
		var suc = JSON.stringify($scope.sucursal);

		console.info("suc", $scope.sucursal);

	  	SrvLocales.insertarSucursal(suc)
			.then(function (respuesta){

				console.info("respuesta", respuesta);

				$state.go('local-alta');

			}).catch(function (error){
				console.info("error", error);
			})
	  };

	$scope.Guardar = function(){

		console.log($scope.SubidorDeArchivos.queue);
		if($scope.SubidorDeArchivos.queue[0]!=undefined)
		{
			var nombreFoto = $scope.SubidorDeArchivos.queue[0]._file.name;
			$scope.sucursal.foto1=nombreFoto;
		}
		if($scope.SubidorDeArchivos.queue[1]!=undefined)
		{
			var nombreFoto = $scope.SubidorDeArchivos.queue[1]._file.name;
			$scope.sucursal.foto2=nombreFoto;
		}
		if($scope.SubidorDeArchivos.queue[2]!=undefined)
		{
			var nombreFoto = $scope.SubidorDeArchivos.queue[2]._file.name;
			$scope.sucursal.foto3=nombreFoto;
		}

		$scope.SubidorDeArchivos.uploadAll();

	}

});

salaApp.controller('PedidosCtrl', function($scope, $state, $timeout, UsuarioActual, SrvPedidos, SrvProductos, SrvLocales, SrvUsuarios, SrvEncuestas){

	$scope.titulo = "Listado de Pedidos";

    $scope.ListaPedidos = [];

    $scope.ProductoParaMostrar = {
    	nombre : "NOMBRE",
    	precio : "123",
        foto1 : "placeholder1.png",
        foto2 : "placeholder1.png",
        foto3 : "placeholder1.png"
    };

    $scope.SucursalParaMostrar = {
    	nombre : "NOMBRE",
    	localidad : "LOCALIDAD",
        foto1 : "placeholder1.png",
        foto2 : "placeholder1.png",
        foto3 : "placeholder1.png"
    };

    $scope.ClienteParaMostrar = {
    	nombre : "NOMBRE",
    	email: "MAIL"
    };

    $scope.PedidoSeleccionado = {};

    $scope.PedidoParaModificar = {};

    $scope.EncuestaRegistrada = {};

    $scope.MostrarProducto = function(idProducto){
        console.log("MI Producto ANTES", $scope.ProductoParaMostrar);
        SrvProductos.traerUno(idProducto)
        	.then(function (respuesta){
	    		console.info("producto encontrado", respuesta);
		        $scope.ProductoParaMostrar = respuesta.data;
	        	console.log("MI Producto DESPUES", $scope.ProductoParaMostrar);
	    		document.getElementById('id01').style.display='block';
	    	}).catch(function (error){

	    		$scope.ProductoParaMostrar = {
			    	nombre : "NOMBRE",
			    	precio : "123",
			        foto1 : "placeholder1.png",
			        foto2 : "placeholder1.png",
			        foto3 : "placeholder1.png"
			    };

	    	})

    };

    $scope.MostrarSucursal = function(sucursal){
    	console.log("MI SUCURSAL ANTES", $scope.SucursalParaMostrar);
        SrvLocales.traerUna(sucursal)
        	.then(function (respuesta){
	    		console.info("sucursal encontrada", respuesta);
		        $scope.SucursalParaMostrar = respuesta.data;
	        	console.log("MI SUCURSAL DESPUES", $scope.SucursalParaMostrar);
	    		document.getElementById('id02').style.display='block';
	    	}).catch(function (error){

	    		$scope.SucursalParaMostrar = {
			    	nombre : "NOMBRE",
			    	localidad : "LOCALIDAD",
			        foto1 : "placeholder1.png",
			        foto2 : "placeholder1.png",
			        foto3 : "placeholder1.png"
			    };

	    	})
    };

    $scope.MostrarCliente = function(cliente){
    	console.log("MI CLIENTE ANTES", $scope.ClienteParaMostrar);
        SrvUsuarios.traerUno(cliente)
        	.then(function (respuesta){
	    		console.info("cliente encontrado", respuesta);
		        $scope.ClienteParaMostrar = respuesta.data;
	        	console.log("MI CLIENTE DESPUES", $scope.ClienteParaMostrar);
	    		document.getElementById('id03').style.display='block';
	    	}).catch(function (error){

			    $scope.ClienteParaMostrar = {
			    	nombre : "NOMBRE",
			    	email: "MAIL"
			    };

	    	})
    };

    $scope.CerrarPedido = function(pedido){
    	pedido.estado = "Esperando Encuesta";
    	var jsonPedido = JSON.stringify(pedido);
    	SrvPedidos.modificarPedido(jsonPedido)
    		.then(function (respuesta){
	    		$timeout(function(){
	    			console.info(respuesta);
	    		},100);
	    	}).catch(function (error){

	    		console.info("Error", error);

	    	})
    };

    // $scope.BuscarIdxPedido = function(id){
    // 	for (var i = $scope.ListaPedidos.length - 1; i >= 0; i--) {
    // 		if($scope.ListaPedidos[i].idPed == id){
    // 			return i;
    // 		}
    // 	};

    // 	return -1;
    // };

    $scope.RealizarEncuesta = function(pedido){
        $scope.PedidoSeleccionado = pedido;
        document.getElementById('id04').style.display='block';
    };

    $scope.RegistrarEncuesta = function(encuesta){
        encuesta.idPed = $scope.PedidoSeleccionado.idPed;
        encuesta.idCliente = $scope.PedidoSeleccionado.idCliente;
        console.info("Encuesta Recibida", encuesta);
        var jsonEncuesta = JSON.stringify(encuesta);
        SrvEncuestas.insertarEncuesta(jsonEncuesta)
            .then(function (respuesta){
                console.info("Respuesta", respuesta);
                $scope.PedidoSeleccionado.estado = "Cerrado";
                var jsonPedido = JSON.stringify($scope.PedidoSeleccionado);
                SrvPedidos.modificarPedido(jsonPedido)
                    .then(function (respuesta){
                        $timeout(function(){
                            console.info(respuesta);
                            document.getElementById('id04').style.display='none';
                        },100);
                    }).catch(function (error){

                        console.info("Error", error);
                    })
            }).catch(function (error){

                $scope.ListaPedidos = [];

            })

    };

    $scope.ModificarPedido = function(pedidoModif){
        $scope.PedidoParaModificar = pedidoModif;
        $scope.PedidoParaModificar.fechaPedido = new Date(pedidoModif.fechaPedido);
        document.getElementById('id05').style.display='block';
    };

    $scope.RealizarModificacion = function(){
        var jsonModif = JSON.stringify($scope.PedidoParaModificar);
        SrvPedidos.modificarPedido(jsonModif)
            .then(function (respuesta){
                $timeout(function(){
                    console.info(respuesta);
                    document.getElementById('id05').style.display='none';
                },100);
            }).catch(function (error){

                console.info("Error", error);

            })
    }

    $scope.CancelarModificacion = function(){
        $scope.ListaPedidos = [];
        SrvPedidos.traerTodos()
        .then(function (respuesta){

            console.info("todos los Pedidos", respuesta);
            $scope.ListaPedidos = respuesta.data;

        }).catch(function (error){

            $scope.ListaPedidos = [];

        })
    };

    SrvPedidos.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los pedidos", respuesta);
            $scope.ListaPedidos = respuesta.data;
            for (var i = $scope.ListaPedidos.length - 1; i >= 0; i--) {
                $scope.ListaPedidos[i].fechaPedido = new Date(respuesta.data[i].fechaPedido);
            };

    	}).catch(function (error){

    		$scope.ListaPedidos = [];

    	})

});

salaApp.controller('PedidoAltaCtrl', function($scope, $state, $timeout, $interval, UsuarioActual, SrvPedidos, SrvProductos, SrvLocales, SrvUsuarios, SrvOfertas){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.pedido = {};
	$scope.pedido.idProd = -1;
	$scope.pedido.idSuc = -1;
	$scope.pedido.idCliente = -1;
	$scope.pedido.estado = "Pendiente";

	$scope.oferta = -1;

	var dtMin = new Date();
    dtMin.setDate(dtMin.getDate() + 2);

	var month = dtMin.getMonth() + 1;
    var day = dtMin.getDate();
    var year = dtMin.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

	$scope.minDate = day + '/' + month + '/' + year;
	var dtMax = new Date();
	dtMax.setDate(dtMax.getDate() + 5);

	month = dtMax.getMonth() + 1;
    day = dtMax.getDate();
    year = dtMax.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

	$scope.maxDate = day + '/' + month + '/' + year;

    $scope.fechaInvalida = true;

	$scope.ListaProductos = [];
	$scope.ListaSucursales = [];
	$scope.ListaOfertas = [];
	$scope.ListaUsuarios = [];

	$scope.ChequearFechas = function(){
        var realMinDate = new Date(); 
        realMinDate.setHours(0);  
        realMinDate.setMinutes(0);  
        realMinDate.setSeconds(-1);  
        realMinDate.setDate(realMinDate.getDate() + 2);
        var realMaxDate = new Date();
        realMaxDate.setHours(0);  
        realMaxDate.setMinutes(0);  
        realMaxDate.setSeconds(0);
        realMaxDate.setDate(realMaxDate.getDate() + 5);

		var checkMin = $scope.pedido.fechaPedido < realMinDate;
		var checkMax = $scope.pedido.fechaPedido > realMaxDate;

        console.log(checkMin + " /// " + checkMax);

		$scope.fechaInvalida = (checkMin || checkMax);

        console.log(realMinDate + " | " + $scope.pedido.fechaPedido + " | " + realMaxDate + " | " + $scope.fechaInvalida);
	}

	SrvProductos.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los productos", respuesta);
        	$scope.ListaProductos = respuesta.data;
        	SrvLocales.traerTodas()
		    	.then(function (respuesta){

		    		console.info("todas las sucursales", respuesta);
		        	$scope.ListaSucursales = respuesta.data;
		        	SrvUsuarios.traerTodos()
				    	.then(function (respuesta){

				    		console.info("todos los usuarios", respuesta);
				        	$scope.ListaUsuarios = respuesta.data;
                            SrvOfertas.traerTodas()
                            .then(function (respuesta){

                                console.info("todas las ofertas", respuesta);
                            $scope.ListaOfertas = respuesta.data;

                            }).catch(function (error){

                                $scope.ListaOfertas = [];

                            })

				    	}).catch(function (error){

    						console.info("ERROR",error);
				    		$scope.ListaUsuarios = [];

				    	})
		    	}).catch(function (error){

    				console.info("ERROR",error);
		    		$scope.ListaSucursales = [];

		    	})
    	}).catch(function (error){

    		console.info("ERROR",error);
    		$scope.ListaProductos = [];

    	});


    $scope.updateMonto = $interval(function(){
    	if($scope.pedido.idProd != -1){
    		var idxProd = $scope.BuscarIdxProducto($scope.pedido.idProd);
    		if(idxProd != -1){
    			var idxSuc = $scope.BuscarIdxSucursal($scope.pedido.idSuc);
    			if(idxSuc != -1){
    				$scope.oferta = $scope.BuscarOferta($scope.pedido.idProd,$scope.pedido.idSuc);
    				if($scope.oferta != -1){
    					$scope.pedido.monto = $scope.ListaProductos[idxProd].precio * $scope.pedido.cantPedida * ($scope.oferta / 100);
    				}else{
    					$scope.pedido.monto = $scope.ListaProductos[idxProd].precio * $scope.pedido.cantPedida;
    				}
    			}
    		}
    	}
    },100);

    $scope.BuscarIdxProducto = function(id){
    	for (var i = $scope.ListaProductos.length - 1; i >= 0; i--) {
    		if($scope.ListaProductos[i].idProd == id){
    			return i;
    		}
    	};

    	return -1;
    };

    $scope.BuscarIdxSucursal = function(id){
    	for (var i = $scope.ListaSucursales.length - 1; i >= 0; i--) {
    		if($scope.ListaSucursales[i].idSuc == id){
    			return i;
    		}
    	};

    	return -1;
    };

    $scope.BuscarOferta = function(idP,idS){
    	for (var i = $scope.ListaOfertas.length - 1; i >= 0; i--) {
    		if($scope.ListaOfertas[i].idProd == idP && $scope.ListaOfertas[i].idSuc == idS){
    			return $scope.ListaOfertas[i].descuento;
    		}
    	};

    	return -1;
    }
    

	$scope.Guardar = function(){

		var pedido = JSON.stringify($scope.pedido);

		console.info("pedido", $scope.pedido);

		SrvPedidos.insertarPedido(pedido)
			.then(function (respuesta){

				console.info("respuesta", respuesta);

				$state.go('menuPedidos.lista');

			}).catch(function (error){
				console.info("error", error);
			})

	};

});

salaApp.controller('OfertasCtrl', function($scope, $state, $timeout, SrvOfertas, SrvProductos, SrvLocales){

	$scope.titulo = "Listado de Ofertas";

    $scope.ListaOfertas = [];

    $scope.OfertaParaModificar = {};

    $scope.ProductoParaMostrar = {
    	nombre : "NOMBRE",
    	precio : "123",
        foto1 : "placeholder1.png",
        foto2 : "placeholder1.png",
        foto3 : "placeholder1.png"
    };

    $scope.SucursalParaMostrar = {
    	nombre : "NOMBRE",
    	localidad : "LOCALIDAD",
        foto1 : "placeholder1.png",
        foto2 : "placeholder1.png",
        foto3 : "placeholder1.png"
    };

    $scope.MostrarProducto = function(idProducto){
        console.log("MI Producto ANTES", $scope.ProductoParaMostrar);
        SrvProductos.traerUno(idProducto)
        	.then(function (respuesta){
	    		console.info("producto encontrado", respuesta);
		        $scope.ProductoParaMostrar = respuesta.data;
	        	console.log("MI Producto DESPUES", $scope.ProductoParaMostrar);
	    		document.getElementById('id01').style.display='block';
	    	}).catch(function (error){

	    		$scope.ProductoParaMostrar = {
			    	nombre : "NOMBRE",
			    	precio : "123",
			        foto1 : "placeholder1.png",
			        foto2 : "placeholder1.png",
			        foto3 : "placeholder1.png"
			    };

	    	})

    };

    $scope.ModificarOferta = function(oferModif){
        $scope.OfertaParaModificar = oferModif;
        $scope.OfertaParaModificar.fechaFin = new Date(oferModif.fechaFin);
        document.getElementById('id03').style.display='block';
    };

    $scope.RealizarModificacion = function(){
        var jsonModif = JSON.stringify($scope.OfertaParaModificar);
        SrvOfertas.modificarOferta(jsonModif)
            .then(function (respuesta){
                $timeout(function(){
                    console.info(respuesta);
                    document.getElementById('id03').style.display='none';
                },100);
            }).catch(function (error){

                console.info("Error", error);

            })
    }

    $scope.CancelarModificacion = function(){
        $scope.ListaOfertas = [];
        SrvOfertas.traerTodas()
        .then(function (respuesta){

            console.info("todas las ofertas", respuesta);
            $scope.ListaOfertas = respuesta.data;

        }).catch(function (error){

            $scope.ListaOfertas = [];

        })
    };

    $scope.MostrarSucursal = function(sucursal){
    	console.log("MI SUCURSAL ANTES", $scope.SucursalParaMostrar);
        SrvLocales.traerUna(sucursal)
        	.then(function (respuesta){
	    		console.info("sucursal encontrada", respuesta);
		        $scope.SucursalParaMostrar = respuesta.data;
	        	console.log("MI SUCURSAL DESPUES", $scope.SucursalParaMostrar);
	    		document.getElementById('id02').style.display='block';
	    	}).catch(function (error){

	    		$scope.SucursalParaMostrar = {
			    	nombre : "NOMBRE",
			    	localidad : "LOCALIDAD",
			        foto1 : "placeholder1.png",
			        foto2 : "placeholder1.png",
			        foto3 : "placeholder1.png"
			    };

	    	})
    };

    SrvOfertas.traerTodas()
    	.then(function (respuesta){

    		console.info("todas las ofertas", respuesta);
        $scope.ListaOfertas = respuesta.data;

    	}).catch(function (error){

    		$scope.ListaOfertas = [];

    	})

});

salaApp.controller('OfertaAltaCtrl', function($scope, $state, $timeout, UsuarioActual, SrvOfertas, SrvProductos, SrvLocales){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.ofer = {};

	$scope.ListaProductos = [];
	$scope.ListaSucursales = [];

	SrvProductos.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los productos", respuesta);
        	$scope.ListaProductos = respuesta.data;
        	SrvLocales.traerTodas()
		    	.then(function (respuesta){

		    		console.info("todas las sucursales", respuesta);
		        	$scope.ListaSucursales = respuesta.data;
		        	
		    	}).catch(function (error){

    				console.info("ERROR",error);
		    		$scope.ListaSucursales = [];

		    	})
    	}).catch(function (error){

    		console.info("ERROR",error);
    		$scope.ListaProductos = [];

    	});

    $scope.ChequearFecha = function(){
        var realMinDate = new Date(); 
        realMinDate.setHours(0);  
        realMinDate.setMinutes(0);  
        realMinDate.setSeconds(0);  

		$scope.fechaInvalida = $scope.ofer.fechaFin < realMinDate;
	}

	$scope.Guardar = function(){

		var oferta = JSON.stringify($scope.ofer);

		console.info("oferta", $scope.ofer);

		SrvOfertas.insertarOferta(oferta)
			.then(function (respuesta){

				console.info("respuesta", respuesta);

				$state.go('menuOfertas.lista');

			}).catch(function (error){
				console.info("error", error);
			})

	}

});


salaApp.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});