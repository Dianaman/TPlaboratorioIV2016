angular.module("salaDeJuegosApp");

salaApp.controller('PedidosCtrl', function($scope, $state, $timeout, UsuarioActual, 
    SrvPedidos, SrvProductos, SrvLocales, SrvUsuarios, SrvEncuestas, $filter){

    if(!UsuarioActual.getCargo()){
        $state.go('usuario.login');
    }

	$scope.titulo = "Listado de Pedidos";

    $scope.ListaPedidos = [];

    $scope.ProductoParaMostrar = {};

    $scope.SucursalParaMostrar = {};

    $scope.ClienteParaMostrar = {};

    $scope.PedidoSeleccionado = {};

    $scope.PedidoParaModificar = {};

    $scope.EncuestaRegistrada = {};

    $scope.userActual = {};

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

    $scope.CambiarEstado = function(pedido, estado){
    	SrvPedidos.modificarEstado(pedido.id_pedido, estado)
    		.then(function (respuesta){
                console.info(respuesta);

    		    SrvPedidos.traerTodos()
                .then(function (respuesta){

                    console.info("todos los pedidos", respuesta);
                    $scope.ListaPedidos = respuesta.data;
                    for (var i = $scope.ListaPedidos.length - 1; i >= 0; i--) {
                        $scope.ListaPedidos[i].fechaPedido = new Date(respuesta.data[i].fechaPedido);
                    };

                    if($scope.userActual.cargo == 'comprador'){
                        $scope.ListaPedidos = $filter('filter')($scope.ListaPedidos, {id_cliente: $scope.userActual.id});  
                    }
                }).catch(function (error){

                    $scope.ListaPedidos = [];

                })
	    	}).catch(function (error){

	    		console.info("Error", error);

	    	})
    };

    $scope.RealizarEncuesta = function(pedido){
        $state.go('encuesta', {pedido: pedido.id_pedido});
    };
    
    $scope.userActual = JSON.parse(UsuarioActual.getFullData());


    SrvPedidos.traerTodos()
	.then(function (respuesta){

		console.info("todos los pedidos", respuesta);
        $scope.ListaPedidos = respuesta.data;
        for (var i = $scope.ListaPedidos.length - 1; i >= 0; i--) {
            $scope.ListaPedidos[i].fechaPedido = new Date(respuesta.data[i].fechaPedido);
        };

        if($scope.userActual.cargo == 'comprador'){
            $scope.ListaPedidos = $filter('filter')($scope.ListaPedidos, {id_cliente: $scope.userActual.id});  
        }
	}).catch(function (error){

		$scope.ListaPedidos = [];

	})


});
