angular.module("salaDeJuegosApp");

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

