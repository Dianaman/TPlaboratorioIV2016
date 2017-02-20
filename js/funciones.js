var salaApp = angular.module("salaDeJuegosApp", ['ui.router', 'angularFileUpload', 'satellizer']);

salaApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	$authProvider.loginUrl = 'SalaDeJuegos/servidor/jwt/php/auth.php';
	$authProvider.tokenName = 'SalaDeJuegosToken';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authHeader = 'data';

	$authProvider.github({
	  url: '/usuario/login',
	  authorizationEndpoint: 'http://github.com/login',
	  redirectUri: window.location.origin,
	  optionalUrlParams: ['login_field'],
	  login_field: ['login:diana.man.91@gmail.com'],
	  scopeDelimiter: ' ',
	  oauthType: '2.0',
	  popupOptions: { width: 1020, height: 618 }
	});


	$stateProvider
		.state(
			"persona", {
				url: '/persona',
				abstract: true,
				templateUrl: 'templates/persona/persona.html'
			})
		.state(
			"persona.menu", {
				url: '/menu',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-menu.html',
						controller: 'PersonaMenuCtrl'
					}
				}
			})
		.state(
			"persona.alta", {
				cache:false,
				url: '/alta/:id',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-alta.html',
						controller: 'PersonaAltaCtrl'
					}
				}
			})
		.state(
			"persona.grilla", {
				url: '/grilla',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-grilla.html',
						controller: 'PersonaGrillaCtrl'
					}
				}
			})
		.state(
			"usuario", {
				url: '/usuario',
				abstract: true,
				templateUrl: 'templates/usuario/usuario.html'
			})

		.state(
			"usuario.login", {
				url: '/login',
				views:{
					"content": {
						templateUrl: 'templates/usuario/login.html',
						controller: 'LoginCtrl'
					}
				}
			})

		.state(
			"usuario.signin", {
				url: '/signin',
				views:{
					"content": {
						templateUrl: 'templates/usuario/signin.html',
						controller: 'SigninCtrl'
					}
				}
			})

		.state(
			"menu", {
				url: '/menu',
				templateUrl: 'templates/menu.html',
				controller: 'MenuCtrl'	
			})

		.state(
			"menu-pizza", {
				url: '/menu/:pizza',
				templateUrl: 'templates/menu-pizza.html',
				controller: 'MenuPizzaCtrl'	
			})

		$urlRouterProvider.otherwise("/persona/menu");
		
});

salaApp.run(function($rootScope, $state){
  $rootScope.usuario = {
  	nombre: '',
  	tipo: '',
  	loggeado:true
  };

  $rootScope.IrAMenu = function(){
  	$state.go('menu');
  }

});

salaApp.controller("MenuCtrl", function($scope, $state, $http){
	$scope.pizzas = [
		{
			id: 0001,
			title: 'Pizza de Muzarella',
			desc: 'Queso muzzarella, salsa de tomate, oregano y aceitunas',
			img: 'img/muzzarella.jpg'
		},
		{
			id: 0002,
			title: 'Pizza Napolitana',
			desc: 'Queso muzzarella, salsa de tomate, tomates en rodajas, oregano, ajo y aceitunas',
			img: 'img/napolitana.jpg'
		},
		{
			id: 0003,
			title: 'Fainá',
			desc: 'Masa con harina de garbanzos',
			img: 'img/faina.jpg'
		}
	];

	$http.get('http://localhost/ws2/pizza').then(function(response){
		var arrpizzas = [];
		$scope.pizzas = [];
		
		for(var i=0; i< response.data.length; i++)
		{
			var title = response.data[i].tipo + ' ' + response.data[i].nombre;

			if(arrpizzas.indexOf(title)<=-1){
				var pizza = {
					title: title,
					nombre: response.data[i].nombre,
					tipo: response.data[i].tipo,
					desc: 'asdsadad'
				}
				arrpizzas.push(title);
				$scope.pizzas.push(pizza);
			}
		}


	}, function errorCallback(response){
		console.error(response);
	});


	$scope.selectPizza = function(pizza){
		var unaPizza = JSON.stringify(pizza);
		$state.go('menu-pizza', {pizza: unaPizza});
	}
});

salaApp.controller("MenuPizzaCtrl", function($stateParams, $scope, $http){
	$scope.pizza;
	
	var tipo = JSON.parse($stateParams.pizza);
	console.log(tipo);

	var param = {
		tipo: tipo.tipo,
		nombre: tipo.nombre
	}

	$http.get('http://localhost/ws2/pizza/tipo/' + JSON.stringify(param)).then(
		function(response){
			console.log(response);
			$scope.pizza = response.data;
		}, function errorCallback(response){
			alert('Ocurrió un error, inténtelo más tarde');
			console.error(response);
		});

	$scope.addCart = function(){

	}
})

salaApp.controller("PersonaMenuCtrl", function($scope, $state){
	$scope.irAAlta = function(){
		$state.go('persona.alta');
	}

	$scope.irAGrilla = function(){
		$state.go('persona.grilla');
	}
});

salaApp.controller("PersonaAltaCtrl", function($scope, $state, FileUploader, $http, $stateParams, $timeout){

	$scope.persona = {
		apellido: 'Jansen', 
		nombre: 'Floor',
		email: 'floor.jansen@mail.com',
		edad: 35,
		estado: 'Soltero',
		sexo: 'Femenino',
		dni:9443556,
		nacimiento: new Date(1984, 05, 11, 0, 0, 0, 0),
		foto: ''
	};
	
	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/nexo.php'});

    $scope.SubidorDeArchivos.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.persona.foto = fileItem;
    };
	
	$scope.SubidorDeArchivos.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };

	if($stateParams.id != ""){
		$scope.id = JSON.parse($stateParams.id);
	}

	$scope.enviarDatos = function(){
		var datost = JSON.stringify($scope.persona);

		$http.post('http://localhost/ws1/usuario/'+ datost)
		.then(function(response){
			console.info(response);

			$state.go('usuario.login');
		}, function errorCallback(response){
			console.info(response);
		});
	}


	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/Archivos.php'});
	$scope.SubidorDeArchivos.onSuccessItem = function(item, response, status, headers){

	}


});

salaApp.controller("PersonaGrillaCtrl", function($scope, $http, $state){
	$http.get('http://localhost/ws1/usuarios')
	.then(function(response){
		$scope.personas = response.data;
	}, function errorCallback(response){
		console.info(response);
	});

	$scope.borrarPersona = function(selectedIndex){
		var dato = JSON.stringify(selectedIndex.id);

		$http.delete('http://localhost/ws1/usuario/'+ dato)
		.then(function(response){
			console.info(response);

		}, function errorCallback(response){
			console.info(response);
		});
	}
/*
	$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];
	*/

	$scope.modificarPersona = function(selectedIndex){
		var idParam = JSON.stringify(selectedIndex.id);
		$state.go('persona.alta', {id:idParam});

	}

	/*$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];*/
});

salaApp.controller("LoginCtrl", function($scope, $auth){
	 $scope.authenticate = function(provider) {
      $auth.authenticate(provider);

      $state.go('menu');
    };
});

salaApp.controller("SigninCtrl", function($scope){
	
})

salaApp.directive('numbersOnly', function(){
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