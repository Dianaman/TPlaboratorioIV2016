angular.module('salaDeJuegosApp')

.directive('modalPedidoFinalizado', function(){

	//$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ )		

	Date.prototype.addDays = function(days) {
	  var dat = new Date(this.valueOf());
	  dat.setDate(dat.getDate() + days);
	  return dat;
	}

	var formatDate = function(date){
	    var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1).toString();
	    var day = date.getDate().toString();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

    	return [year, month, day].join('-');
	}

	return {
		scope: {miPedido: '=pedidoporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalPedidoFinalizado.html',
		controller: ['$scope','SrvPedidos', '$state', function MyTabsController($scope, SrvPedidos, $state) {
		      
			$scope.fecha = {};
			$scope.fecha.min = formatDate(new Date().addDays(2));
			$scope.fecha.max = formatDate(new Date().addDays(5));
			$scope.invalidDate = true;

			console.log($scope.fecha.min);
			console.log($scope.fecha.max);

			$scope.confirmar = function(){
				console.log($scope.miPedido);

				$scope.pedidoAInsertar = {
					id_cliente: $scope.miPedido.cliente[0].id,
					id_sucursal: $scope.miPedido.sucursal.id,
					estado: 'pendiente',
					monto: $scope.miPedido.total,
					fechaPedido: $scope.miPedido.fechaPedido,
					productos: []
				}

				for(var prod of $scope.miPedido.productos){
					$scope.pedidoAInsertar.productos.push({id_producto:prod.id, cantidad: prod.cantidad});
				}

				console.log($scope.pedidoAInsertar);

				var pedidoStr = JSON.stringify($scope.pedidoAInsertar);

				SrvPedidos.insertarPedido(pedidoStr)
				.then(function(res){
					console.info(res);
					$state.go('pedidos');
				}).catch(function(error){
					console.error(error);
				})
			}

			$scope.checkDate = function(){
				$scope.invalidDate = $scope.fechaPedido > new Date($scope.fecha.min) && $scope.fechaPedido > new Date($scope.fecha.max);

				console.log($scope.invalidDate);
			}

	    }]
	};

})

.directive('modalSucursal', function(){

	//$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ )		

	return {
		scope: {miSucursal: '=sucursalporparametro',
		fotosSucursal: '=fotosSucursal'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalSucursal.html'
	};

})

.directive('modalProducto', function(){

	return {
		scope: {miProducto: '=productoporparametro',
		fotosProducto: '=fotosProducto'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalProducto.html'
	};

})

.directive('modalUsuario', function(){

	return {
		scope: {miUsuario: '=usuarioporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalUsuario.html'
	};

})

.directive('modalPedido', function(){

	return {
		scope: {miPedido: '=pedidoporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalPedido.html'
	};

})
.directive('modalEncuesta', function(){

	return {
		scope: {encuesta: '=encuestaporparametro',
		usuario: '=usuarioporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalEncuesta.html'
	};

})

.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});