var salaApp = angular.module("salaDeJuegosApp", ['ui.router', 'angularFileUpload', 'satellizer', 'ngMap', 'ui.carousel']);

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
			"personas", {
				url: '/personas',
				templateUrl: 'templates/persona/persona-grilla.html',
				controller: 'PersonaGrillaCtrl'
			})
		.state(
			"personas-alta", {
				cache:false,
				url: '/personas/alta/:id',
				templateUrl: 'templates/persona/persona-alta.html',
				controller: 'PersonaAltaCtrl'
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
				url: '/menu/:pizzaid',
				templateUrl: 'templates/menu-pizza.html',
				controller: 'MenuPizzaCtrl'	
			})

		.state(
			"productos", {
				url: '/productos',
				templateUrl: 'templates/productos/producto-lista.html',
				controller: 'ProductosCtrl'	
			})

		.state(
			"producto-alta", {
				url: '/productos/alta/:id_producto/:id_sucursal',
				templateUrl: 'templates/productos/producto-alta.html',
				controller: 'ProductoAltaCtrl'	
			})

		.state(
			"locales", {
				url: '/locales',
				templateUrl: 'templates/locales/local-lista.html',
				controller: 'LocalesCtrl'	
			})

		.state(
			"local-alta", {
				url: '/locales/alta',
				templateUrl: 'templates/locales/local-alta.html',
				controller: 'LocalAltaCtrl'	
			})

		.state(
			"pedidos", {
				url: '/pedidos',
				templateUrl: 'templates/pedidos/pedido-lista.html',
				controller: 'PedidosCtrl'	
			})

		.state(
			"pedido-alta", {
				url: '/pedidos/alta',
				templateUrl: 'templates/pedidos/pedido-alta.html',
				controller: 'PedidoAltaCtrl'	
			})

		.state(
			"ofertas", {
				url: '/ofertas',
				templateUrl: 'templates/ofertas/oferta-lista.html',
				controller: 'OfertasCtrl'	
			})

		.state(
			"oferta-alta", {
				url: '/ofertas/alta',
				templateUrl: 'templates/ofertas/oferta-alta.html',
				controller: 'OfertaAltaCtrl'	
			})

		$urlRouterProvider.otherwise("/persona/menu");
		
});

salaApp.run(function($rootScope, $state){
  $rootScope.usuario = {
  	nombre: '',
  	tipo: '',
  	loggeado:false
  };

  $rootScope.IrAMenu = function(){
  	$state.go('menu');
  }

  $rootScope.IrALocales = function(){
  	$state.go('locales');
  }

  $rootScope.IrAPedido = function(){
  	$state.go('pedidos');
  }

  $rootScope.IrAPersonas = function(){
  	$state.go('personas');
  }

  $rootScope.IrAInfo = function(){
  	$state.go('info');
  }

  $rootScope.IrALogin = function(){
  	$state.go('usuario.login');
  }

  $rootScope.IrARegistro = function(){
  	$state.go('usuario.signin');
  }

  $rootScope.IrAProductos = function(){
  	$state.go('productos');
  }


});