angular.module("salaDeJuegosApp");


salaApp.controller("EstadisticasCtrl", function($scope, SrvPedidos, SrvLocales){
	$scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
					"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.series = [];
  $scope.data = [];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  SrvLocales.traerTodas()
  .then(function(res){
  	console.log(res.data);
  	var i=0;
  	for(var suc of res.data){
  		$scope.series.push(suc.nombre);
  		$scope.data[i] = [];
  		for(var j=0;j<12;j++){
  			$scope.data[i][j]= 0;
  		}
	}

	SrvPedidos.verPedidosPorMes()
	.then(function(respuesta){
		console.log(respuesta.data);
		for(var data of respuesta.data){
			var idxi = $scope.series[0].indexOf(data.nombre);
			var idxj = data.mes -1;
			$scope.data[idxi][idxj] = data.monto;
		}
	}).catch(function(error){
		console.error(error);
	})
  }).catch(function(error){
  	console.error(error);
  })
  
  
});