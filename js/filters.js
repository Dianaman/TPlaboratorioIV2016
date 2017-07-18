angular.module('salaDeJuegosApp')

.filter('capitalize', function(){
	return function(input){
		return (!!input) ? input.charAt(0).toUpperCase() + input.substring(1).toLowerCase() : '';
	}
});