angular.module("salaDeJuegosApp");


salaApp.controller("ProductoAltaCtrl", function($scope, $state, FileUploader, SrvProductos, SrvLocales, $stateParams, $timeout){

	$scope.producto = {
		nombre: 'Fugazzeta',
		tipo: 'Pizza',
		descripcion: '',
		foto: '',
		habilitado: true,
		productos_sucursal: [{
			id_sucursal: 1,
			precio: 100
		}]
	};
	
	$scope.modo = ($stateParams.id_producto != '' ? 'Modificar' : 'Agregar');
	console.info($scope.producto);

	SrvLocales.traerTodas()
	.then(function(response){
		$scope.sucursales = response.data;

		if($stateParams.id_producto && $stateParams.id_sucursal){
			$scope.id_producto = JSON.parse($stateParams.id_producto);
			$scope.id_sucursal = JSON.parse($stateParams.id_sucursal);

			SrvProductos.traerUno($scope.id_producto, $scope.id_sucursal)
			.then(function(res){

				console.info(res)
				$scope.producto = res.data;
				$scope.producto.precio = parseInt($scope.producto.precio);
				$scope.producto.productos_sucursal = [{
					precio: $scope.producto.precio,
					id_sucursal: $scope.producto.id_sucursal
				}];

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

    $scope.agregarProductoSucursal = function(){
    	$scope.producto.productos_sucursal.push({});
    	console.log($scope.producto);
    }

	$scope.enviarDatos = function(){
		var datost = JSON.stringify($scope.producto);
		
		console.log($scope.producto);
		
		if($scope.modo == 'Agregar'){
			SrvProductos.insertarProducto(datost)
			.then(function(response){
				console.info(response);

				$state.go('productos');
			}, function errorCallback(error){
				console.error(error);
			});
		} else {
			SrvProductos.modificarProducto(datost)
			.then(function(response){
				console.info(response);

				$state.go('productos');
			}, function errorCallback(error){
				console.error(error);
			});
		}
	}


	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/Archivos.php'});
	$scope.SubidorDeArchivos.onSuccessItem = function(item, response, status, headers){

	}


});

salaApp.controller("ProductosCtrl", function($scope, SrvProductos, $state){
	SrvProductos.traerTodos()
	.then(function(response){
		$scope.productos = response.data;
		console.info($scope.productos);
	}, function errorCallback(response){
		console.info(response);
	});

	$scope.BorrarProducto = function(selectedIndex){
		var idProd = JSON.stringify(selectedIndex.id);
		var idSuc = JSON.stringify(selectedIndex.id_sucursal);

		SrvProductos.borrarProducto(idProd, idSuc)
		.then(function(response){
			console.info(response);

			$scope.productos.splice($scope.productos.indexOf(selectedIndex), 1);
		}, function errorCallback(response){
			console.info(response);
		});
	}

	$scope.ModificarProducto = function(idProd, idSuc){
		$state.go('producto-alta', {id_producto:idProd, id_sucursal:idSuc});

	}

	$scope.MostrarDetalle = function(producto){
        $scope.ProductoParaMostrar = producto;

        $scope.FotosSucursal = [
            'img/'+producto.foto1,
            'img/'+producto.foto2,
            'img/'+producto.foto3
        ]
        document.getElementById('id01').style.display='block';
	}

	$scope.irAgregar = function(){
		$state.go('producto-alta');
	}
});
