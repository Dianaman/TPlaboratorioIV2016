angular.module("salaDeJuegosApp");

salaApp.controller('LocalesCtrl', function($scope, $state, $timeout, SrvLocales, SrvUsuarios, NgMap){

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
        $scope.FotosSucursal = [
            'img/'+sucursal.foto1,
            'img/'+sucursal.foto2,
            'img/'+sucursal.foto3
        ]
        console.log("MI SUCURSAL", $scope.SucursalParaMostrar);
        document.getElementById('id01').style.display='block';

        
        console.log(NgMap)
        NgMap.getMap("sucursalmap").then(function(res){
            // Initialize the Google map
            NgMap.initMap("sucursalmap");
            console.log(NgMap.getMap("sucursalmap"))
        });
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



    $scope.SubidorDeArchivos.onCompleteAll =function()
    {
        var fotos = $scope.SubidorDeArchivos.queue;

	    console.info("fotos", fotos);
    
        $scope.sucursal.foto1 = fotos[0] ? fotos[0].file.name : '';
        $scope.sucursal.foto2 = fotos[1] ? fotos[1].file.name : '';
        $scope.sucursal.foto3 = fotos[2] ? fotos[2].file.name : '';


        $scope.Guardar();
    };

	$scope.Guardar = function(){

        console.info('sucursal', $scope.sucursal);

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
