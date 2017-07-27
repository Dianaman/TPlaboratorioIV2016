angular.module('salaDeJuegosApp')

.directive('modalPedidoFinalizado', function(){

	//$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ )		

	return {
		scope: {miPedido: '=pedidoporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templates/directivas/templateModalPedidoFinalizado.html'
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