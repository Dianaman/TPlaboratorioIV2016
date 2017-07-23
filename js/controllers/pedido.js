angular.module("salaDeJuegosApp");

salaApp.controller('PedidosCtrl', function($scope, $state, $timeout, UsuarioActual, SrvPedidos, SrvProductos, SrvLocales, SrvUsuarios, SrvEncuestas){

	$scope.titulo = "Listado de Pedidos";

    $scope.ListaPedidos = [];

    $scope.ProductoParaMostrar = {};

    $scope.SucursalParaMostrar = {};

    $scope.ClienteParaMostrar = {};

    $scope.PedidoSeleccionado = {};

    $scope.PedidoParaModificar = {};

    $scope.EncuestaRegistrada = {};

    $scope.MostrarDetalle = function(pedido){

        SrvPedidos.traerUno(pedido.id_pedido)
        .then(function(rta){
            console.info(rta.data)
            $scope.PedidoParaMostrar = rta.data;  
            document.getElementById('id06').style.display='block';  
        }).catch(function(error){
            console.error(error);
        })
    }

    $scope.MostrarProducto = function(idProducto){
        console.log("MI Producto ANTES", $scope.ProductoParaMostrar);
        SrvProductos.traerUno(idProducto)
        	.then(function (respuesta){
	    		console.info("producto encontrado", respuesta);
		        $scope.ProductoParaMostrar = respuesta.data;
                $scope.FotosProducto = [];
                if(respuesta.data.foto1) $scope.FotosProducto.push(respuesta.data.foto1);
                if(respuesta.data.foto2) $scope.FotosProducto.push(respuesta.data.foto2);
                if(respuesta.data.foto3) $scope.FotosProducto.push(respuesta.data.foto3);

	        	console.log("MI Producto DESPUES", $scope.ProductoParaMostrar);
	    		document.getElementById('id01').style.display='block';
	    	}).catch(function (error){

	    		$scope.ProductoParaMostrar = {};

	    	})

    };

    $scope.MostrarSucursal = function(sucursal){
    	console.log("MI SUCURSAL ANTES", $scope.SucursalParaMostrar);
        SrvLocales.traerUna(sucursal)
        	.then(function (respuesta){
	    		console.info("sucursal encontrada", respuesta);
		        $scope.SucursalParaMostrar = respuesta.data;
                $scope.FotosSucursal = [];
                if(respuesta.data.foto1) $scope.FotosSucursal.push(respuesta.data.foto1);
                if(respuesta.data.foto2) $scope.FotosSucursal.push(respuesta.data.foto2);
                if(respuesta.data.foto3) $scope.FotosSucursal.push(respuesta.data.foto3);


	        	console.log("MI SUCURSAL DESPUES", $scope.SucursalParaMostrar);
	    		document.getElementById('id02').style.display='block';
	    	}).catch(function (error){

	    		$scope.SucursalParaMostrar = {};

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

			    $scope.ClienteParaMostrar = {};

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