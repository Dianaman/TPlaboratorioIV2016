angular.module("salaDeJuegosApp");


salaApp.controller("EstadisticasCtrl", function($scope, SrvPedidos, SrvLocales, SrvEncuestas, UsuarioActual, $state){

  if(!UsuarioActual.getCargo()){
      $state.go('usuario.login');
  } else if(UsuarioActual.getCargo() != 'admin'){
    $state.go('menu.todos');
  }

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };



  $scope.labelsVentas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.seriesVentas = [];
  $scope.dataVentas = [];


  SrvLocales.traerTodas()
  .then(function(res){
    	console.log(res.data);
    	var i=0;
    	for(var suc of res.data){
    		$scope.seriesVentas.push(suc.nombre);
    		$scope.dataVentas[i] = [];
    		for(var j=0;j<12;j++){
    			$scope.dataVentas[i][j]= 0;
    		}
  	 }

    	SrvPedidos.verPedidosPorMes()
    	.then(function(respuesta){
    		console.log(respuesta.data);
    		for(var data of respuesta.data){
    			var idxi = $scope.seriesVentas[0].indexOf(data.nombre);
    			var idxj = data.mes -1;
    			$scope.dataVentas[idxi][idxj] = data.monto;
    		}
    	}).catch(function(error){
    		console.error(error);
    	})
  }).catch(function(error){
  	console.error(error);
  })
  

  $scope.labelsSatisfaccion = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.seriesSatisfaccion = ['Producto', 'Rapidez', 'Medio'];
  $scope.dataSatisfaccion = [new Array(), new Array(), new Array()];


  SrvEncuestas.traerTodas()
  .then(function(res){
      console.log(res.data);

      for(var i=0; i<3; i++){
        $scope.dataSatisfaccion[i] = [];
        for(var j=0;j<12;j++){
          $scope.dataSatisfaccion[i][j] = 0;
        }
     }
      for(var enc of res.data){
        $scope.dataSatisfaccion[0][enc.mes -1] = enc.puntuacion_producto;
        $scope.dataSatisfaccion[1][enc.mes -1] = enc.puntuacion_rapidez;
        $scope.dataSatisfaccion[2][enc.mes -1] = enc.puntuacion_medio;
     }  
  }).catch(function(error){
    console.error(error);
  })
  
  
});