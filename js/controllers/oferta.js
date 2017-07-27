angular.module("salaDeJuegosApp");

salaApp.controller('OfertasCtrl', function($scope, $state, $timeout, SrvOfertas, SrvProductos, SrvLocales, UsuarioActual){

    if( UsuarioActual.getCargo()){
        $state.go('usuario.login');
    } else if(UsuarioActual.getCargo() == 'comprador'){
        $state.go('menu.todos');
    }
    
	$scope.titulo = "Listado de Ofertas";
    $scope.ListaOfertas = [];
    $scope.OfertaParaModificar = {};
    $scope.ProductoParaMostrar = {};
    $scope.SucursalParaMostrar = {};

    $scope.usuario = JSON.parse(UsuarioActual.getFullData());

    SrvOfertas.traerTodas()
    .then(function (respuesta){
        $scope.ListaOfertas = respuesta.data;
    }).catch(function (error){
        $scope.ListaOfertas = [];
    });
    
    $scope.MostrarProducto = function(idProducto, idSucursal){

        SrvProductos.traerUno(idProducto,idSucursal)
    	.then(function (respuesta){
            var producto = respuesta.data;
	        $scope.ProductoParaMostrar = producto;
            $scope.FotosProducto = [];

            if(producto.foto1) $scope.FotosProducto.push(producto.foto1);
            if(producto.foto2) $scope.FotosProducto.push(producto.foto2);
            if(producto.foto3) $scope.FotosProducto.push(producto.foto3);

    		document.getElementById('id01').style.display='block';
    	}).catch(function (error){

    		$scope.ProductoParaMostrar = {};

    	})

    };

    $scope.MostrarSucursal = function(sucursal){
        SrvLocales.traerUna(sucursal)
    	.then(function (respuesta){
    		console.info("sucursal encontrada", respuesta);
            var sucursal = respuesta.data;
	        $scope.SucursalParaMostrar = sucursal;
            $scope.FotosSucursal = [];

            if(sucursal.foto1) $scope.FotosSucursal.push(sucursal.foto1);
            if(sucursal.foto2) $scope.FotosSucursal.push(sucursal.foto2);
            if(sucursal.foto3) $scope.FotosSucursal.push(sucursal.foto3);


    		document.getElementById('id02').style.display='block';
    	}).catch(function (error){

    		$scope.SucursalParaMostrar = {};

    	})
    };

    $scope.ModificarOferta = function(oferta){
        $state.go('oferta-alta', {id: oferta.id})
    }

    $scope.EliminarOferta = function(oferta){
        SrvOfertas.borrarOferta(oferta.id_oferta)
        .then(function(respuesta){
            $scope.ListaOfertas.splice($scope.ListaOfertas.indexOf(oferta), 1);
        }).catch(function(error){
            console.info(error);
        });
    }

    $scope.IrAgregar = function(){
        $state.go('oferta-alta');
    }


});

salaApp.controller('OfertaAltaCtrl', function($scope, $state, $stateParams, $timeout, UsuarioActual, SrvOfertas, SrvProductos, SrvLocales){

    if( UsuarioActual.getCargo()){
        $state.go('usuario.login');
    } else if(UsuarioActual.getCargo() == 'comprador'){
        $state.go('menu.todos');
    }
    
	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.ofer = {};

	$scope.ListaProductos = [];
	$scope.ListaSucursales = [];

    $scope.modo = 'Agregar';
    var id;


	SrvProductos.traerTodos()
	.then(function (respuesta){
        var data = respuesta.data;
        for(var i=0; i<data.length; i++){
            var d = data[i];

            var producto = {
                'id': d.id,
                'nombre': d.nombre
            }

            var encontroSucursal = false;

            for(var j=0; j<$scope.ListaSucursales.length; j++){
                if($scope.ListaSucursales[j].id == d.id_sucursal){
                    $scope.ListaSucursales[j].productos.push(producto);
                    encontroSucursal = true;
                    break;
                }    
            }
            
            if(!encontroSucursal){
                $scope.ListaSucursales.push({
                    'id':d.id_sucursal,
                    'sucursal': d.snombre,
                    'productos': [producto]
                });
            }
        }


        if($stateParams['id']){
            $scope.modo = 'Modificar';
            id = $stateParams['id'];

            SrvOfertas.traerUna(id)
            .then(function(respuesta){
                console.info(respuesta)
                respuesta.data[0].fechaFin = new Date(respuesta.data[0].fechaFin);
                $scope.ofer = respuesta.data[0];
                $scope.ofer.id_sucursal = buscarSucursal($scope.ofer.id_sucursal);
                $scope.traerProductos();
                $scope.ofer.id_producto = buscarProductoEnSucursal($scope.ofer.id_sucursal, $scope.ofer.id_producto);
                console.info($scope.ofer);
            }).catch(function(error){
                console.error(error);
            });
        }

	}).catch(function (error){

		console.info("ERROR",error);
		$scope.ListaProductos = [];

	});
 
    $scope.traerProductos = function(){

        for(var i=0; i<$scope.ListaSucursales.length; i++){
            if($scope.ofer.id_sucursal.id == $scope.ListaSucursales[i].id){ 
                $scope.ListaProductos = $scope.ListaSucursales[i].productos;
            }
        }
    }

    var buscarSucursal = function(idsucursal){
        for(var suc of $scope.ListaSucursales){
            if(suc.id == idsucursal){ return suc; }
        }
    }
    var buscarProductoEnSucursal = function(listaSucursales, idproducto){

        for(var prod of listaSucursales.productos){
            if(prod.id == idproducto){ 
                return {
                    id: idproducto,
                    nombre: prod.nombre
                }
            }
        }
    }

    $scope.ChequearFecha = function(){
        var realMinDate = new Date(); 
        realMinDate.setHours(0);  
        realMinDate.setMinutes(0);  
        realMinDate.setSeconds(0);  

		$scope.fechaInvalida = $scope.ofer.fechaFin < realMinDate;
	}

	$scope.Guardar = function(){
        $scope.ofer.id_producto = $scope.ofer.id_producto.id;
        $scope.ofer.id_sucursal = $scope.ofer.id_sucursal.id;

		var oferta = JSON.stringify($scope.ofer);

        if(id){
    		SrvOfertas.modificarOferta(oferta)
    		.then(function (respuesta){
                console.log(respuesta)
                $state.go('ofertas');
    		}).catch(function (error){
    			console.error("error", error);
    		})
        }else{
            SrvOfertas.insertarOferta(oferta)
            .then(function (respuesta){
                console.log(respuesta)
                $state.go('ofertas');
            }).catch(function (error){
                console.error("error", error);
            })
        }
	}

});

