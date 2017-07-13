angular.module("salaDeJuegosApp");

salaApp.controller('LocalesCtrl', function($scope, $state, $timeout, SrvLocales, SrvUsuarios){

	$scope.titulo = "Listado de Sucursales";


    $scope.ListaSucursales = [];

    $scope.SucursalParaMostrar = {};

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

	});

    $scope.irAgregar = function(){
        $state.go('local-alta');
    }

});


salaApp.controller('LocalAltaCtrl', function($scope, $state, $timeout,UsuarioActual,FileUploader,SrvLocales, SrvUsuarios){
	
	$scope.SubidorDeArchivos=new FileUploader({url:SrvLocales.traerUrlFotos()});
  	$scope.SubidorDeArchivos.queueLimit = 3;

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.sucursal = {};
	$scope.sucursal.encargado = 0;
	$scope.sucursal.foto1 = "sin foto";
	$scope.sucursal.foto2 = "sin foto";
	$scope.sucursal.foto3 = "sin foto";

    SrvUsuarios.traerEncargados()
    .then(function(response){
        $scope.encargados = response.data;
    }, function(error){
        console.error(error)
    })


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

        var strSuc = JSON.stringify($scope.sucursal);
        SrvLocales.insertarSucursal(strSuc)
        .then(function(response){
            console.info(response);
            $state.go('locales')
        }, function(error){
            console.error(error)
        })
	}

});
