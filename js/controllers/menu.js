angular.module("salaDeJuegosApp");


salaApp.controller("MenuCtrl", function($scope, $rootScope, UsuarioActual, SrvPedidos){
	$scope.pedido = {
		cliente: {
			nombre: ''
		},
		productos: []
	};
	$scope.usuario = {};

	$rootScope.$on('login', function(event, data){

		UsuarioActual.getName();
		$scope.pedido.cliente.nombre = UsuarioActual.getName();
		$scope.usuario.tipo = UsuarioActual.getCargo();

		console.log($scope.usuario);
		console.log(UsuarioActual.getCargo());
		
	})
	

	$rootScope.$on('pedidomodificado', function(event, data){
		//console.log(event);
		console.log(data);
		$scope.pedido.productos.push(data);
		$scope.pedido.total=0;
		for(var pedido of $scope.pedido.productos){
			$scope.pedido.total += pedido.total;
		}
	});

	$scope.realizarPedido = function(){
		document.getElementById('finalizacion-pedido').style.display = 'block';
		$scope.PedidoPorParametro = $scope.pedido;
	}

	$scope.confirmar = function(){
		console.log($scope.PedidoPorParametro);

		SrvPedidos.insertarPedido($scope.PedidoPorParametro)
		.then(function(res){
			console.info(res);
		}).catch(function(error){
			console.error(error);
		})
	}
});

salaApp.controller("MenuTodosCtrl", function($scope, $state, $http, SrvProductos, SrvLocales, SrvOfertas, $filter){
	$scope.pizzas = [];
	$scope.pizzasTodas = [];
	$scope.ListaSucursales = [];

	SrvProductos.traerTodos().then(function(respuesta){
		console.log(respuesta)
		$scope.pizzas = respuesta.data;
		SrvOfertas.traerTodas().then(function(res){
			console.log(res);
			$scope.pizzas.push.apply($scope.pizzas, res.data);
			for(var pizza of $scope.pizzas){
				if(pizza.id_oferta) {pizza.tipo = 'oferta';}
				else {pizza.tipo = 'producto';}
			}
			$scope.pizzasTodas = $scope.pizzas;
		}).catch(function(error){
			console.info(error);
		})

	SrvLocales.traerTodas()
		.then(function(respuesta){
			var suc = {id_sucursal: '', nombre: 'Todas las sucursales'};
			$scope.ListaSucursales.push(suc);
			$scope.ListaSucursales.push.apply($scope.ListaSucursales, respuesta.data);

			$scope.sucursal = suc;
			console.log(respuesta.data);
		}).catch(function(error){
			console.error(error);
		})
	}).catch(function (error){
		console.error('error', error);
	});

	$scope.selectPizza = function(pizza){
		if(!pizza.id_oferta){
			$state.go('menu.producto', {productoid: pizza.id, sucursalid: pizza.id_sucursal});
		}
		else {
			$state.go('menu.oferta', {ofertaid: pizza.id_oferta});	
		}
	}

	$scope.tipo = '';
	$scope.sucursal = '';

	$scope.filtrarPorSucursal = function(){
		if($scope.sucursal.id_sucursal){
        	$scope.pizzas = $filter('filter')($scope.pizzasTodas, {id_sucursal: $scope.sucursal.id_sucursal});
    	}
    	else {
    		$scope.pizzas = $scope.pizzasTodas;
    	}

	}
	
	$scope.filtrarPorTipo = function(){
		console.info($scope.tipo);
		if($scope.tipo){
			$scope.pizzas = $filter('filter')($scope.pizzasTodas, {tipo: $scope.tipo});
		} else {
				$scope.pizzas = $scope.pizzasTodas;
		}
        
	}
});

salaApp.controller("MenuPizzaCtrl", function($stateParams, $scope, $state, SrvProductos, SrvOfertas, $rootScope){
	$scope.pizza;
	$scope.fotosProducto = [];
	$scope.total;
	$scope.cantidad;
	
	console.log($stateParams);

	if($stateParams.productoid){
		SrvProductos.traerUno($stateParams.productoid, $stateParams.sucursalid)
		.then(function(response){
				console.log(response);
				$scope.pizza = response.data;
				if($scope.pizza.foto1) $scope.fotosProducto.push($scope.pizza.foto1);
				if($scope.pizza.foto2) $scope.fotosProducto.push($scope.pizza.foto2);
				if($scope.pizza.foto3) $scope.fotosProducto.push($scope.pizza.foto3);
				$scope.pizza.cantidad = 1;
				$scope.calcularMonto();
		}, function errorCallback(response){
			alert('Ocurrió un error, inténtelo más tarde');
			console.error(response);
		});
	} else {
		SrvOfertas.traerUna($stateParams.ofertaid)
		.then(function(response){
				console.log(response);
				$scope.pizza = response.data[0];
				if($scope.pizza.foto1) $scope.fotosProducto.push($scope.pizza.foto1);
				if($scope.pizza.foto2) $scope.fotosProducto.push($scope.pizza.foto2);
				if($scope.pizza.foto3) $scope.fotosProducto.push($scope.pizza.foto3);
				$scope.pizza.cantidad = 1;
				$scope.pizza.precio = $scope.pizza.precio - ($scope.pizza.precio * $scope.pizza.tipo_descuento / 100);
				$scope.calcularMonto();
		}, function errorCallback(response){
			alert('Ocurrió un error, inténtelo más tarde');
			console.error(response);
		});
	}

	$scope.calcularMonto = function(){
		$scope.pizza.total = $scope.pizza.precio * $scope.pizza.cantidad;
	}

	$scope.agregarProducto = function(){
		$rootScope.pedido.productos.push($scope.pizza);
		$rootScope.$emit('pedidomodificado', $scope.pizza);
		console.log($scope.pizza);
		console.log($rootScope.pedido);
		$state.go('menu.todos');
	}
});