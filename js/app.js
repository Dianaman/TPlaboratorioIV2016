var salaApp = angular.module("salaDeJuegosApp", ['ui.router', 'angularFileUpload', 'satellizer', 'ngMap', 'ui.carousel', 'chart.js']);

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
			"usuario.grilla", {
				url: '/grilla',
				views:{
					"content":{
						templateUrl: 'templates/usuario/usuarios.html',
						controller: 'UsuarioGrillaCtrl'
					}
				}
			})
		.state(
			"usuario.alta", {
				cache:false,
				url: '/alta/:id',
				views:{
					"content":{
						templateUrl: 'templates/usuario/usuario-alta.html',
						controller: 'UsuarioAltaCtrl'
					}
				}
			})
		.state(
			"menu", {
				url: '/menu',
				abstract: true,
				templateUrl: 'templates/menu/menu.html',
				controller: 'MenuCtrl'	
			})
		.state(
			"menu.todos", {
				url: '/todos',
				views:{
					"content":{
						templateUrl: 'templates/menu/menu-todos.html',
						controller: 'MenuTodosCtrl'	
					}
				}
			})

		.state(
			"menu.producto", {
				url: '/ver/:productoid/:sucursalid',
				views:{
					"content":{
						templateUrl: 'templates/menu/menu-pizza.html',
						controller: 'MenuPizzaCtrl'	
					}
				}
			})

		.state(
			"menu.oferta", {
				url: '/ver/:ofertaid',
				views:{
					"content":{
						templateUrl: 'templates/menu/menu-pizza.html',
						controller: 'MenuPizzaCtrl'	
					}
				}
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
				url: '/ofertas/alta/:id',
				templateUrl: 'templates/ofertas/oferta-alta.html',
				controller: 'OfertaAltaCtrl'	
			})

		.state(
			"estadisticas", {
				url: '/estadisticas',
				templateUrl: 'templates/estadisticas.html',
				controller: 'EstadisticasCtrl'	
			})

		.state(
			"encuesta", {
				url: '/encuesta/:pedido',
				templateUrl: 'templates/encuestas/encuesta.html',
				controller: 'EncuestaCtrl'	
			})

		.state(
			"encuestas", {
				url: '/encuestas',
				templateUrl: 'templates/encuestas/encuestas.html',
				controller: 'EncuestasCtrl'	
			})
		$urlRouterProvider.otherwise("/persona/menu");
		
});

salaApp.run(function($rootScope, $state){
  $rootScope.usuario = {
  	nombre: '',
  	tipo: '',
  	loggeado:false
  };

  $rootScope.pedido = {
  	productos: []
  };

  $rootScope.IrAMenu = function(){
  	$state.go('menu.todos');
  }

  $rootScope.IrAOfertas = function(){
  	$state.go('ofertas');
  }

  $rootScope.IrAProductos = function(){
  	$state.go('productos');
  }

  $rootScope.IrALocales = function(){
  	$state.go('locales');
  }

  $rootScope.IrAPedido = function(){
  	$state.go('pedidos');
  }

  $rootScope.IrAEstadisticas = function(){
  	$state.go('estadisticas');
  }

  $rootScope.IrAEncuestas = function(){
  	$state.go('encuestas');
  }

  $rootScope.IrAUsuarios = function(){
  	$state.go('usuario.grilla');
  }

  $rootScope.IrALogin = function(){
  	$state.go('usuario.login');
  }

  $rootScope.IrARegistro = function(){
  	$state.go('usuario.alta');
  }


});