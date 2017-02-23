angular.module('salaDeJuegosApp')
.service('SrvUsuarios', function ($http, factoryRutas){

	this.insertarUsuario = InsertarUsuario;
	this.traerTodos = TraerTodos;
	this.traerUno = TraerUno;
	this.traerUnoPorSucursal = TraerUnoPorSucursal;
	this.borrarUsuario = BorrarUsuario;
	this.modificarUsuario = ModificarUsuario;
	this.traerUrlFotos = TraerUrlFotos;

	var url = factoryRutas.RutaUsuarios;

	function InsertarUsuario(usuario){
		return $http.post(url + usuario)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function ModificarUsuario(usuario){
		return $http.put(url + usuario)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	}


	function TraerTodos(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function TraerUno(id){
		return $http.get(url+id)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function TraerUnoPorSucursal(idSucu){

		return $http.get(url+"sucursal/"+idSucu)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};


	function BorrarUsuario(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerUrlFotos(){
		return factoryRutas.RutaFotos;
	};

	

})

.service('SrvLocales', function ($http, factoryRutas){

	this.insertarSucursal = InsertarSucursal;
	this.traerTodas = TraerTodas;
	this.traerUna = TraerUna;
	this.borrarSucursal = BorrarSucursal;
	this.modificarSucursal = ModificarSucursal;
	this.traerUrlFotos = TraerUrlFotos;
	
	var url = factoryRutas.RutaSucursales;

	function InsertarSucursal(sucursal){
		return $http.post(url + sucursal)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function ModificarSucursal(sucursal){
		return $http.put(url + sucursal)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};


	function TraerTodas(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function TraerUna(id){
		return $http.get(url+id)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};


	function BorrarSucursal(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerUrlFotos(){
		return factoryRutas.RutaFotos;
	};
})

.service('SrvPedidos', function ($http, factoryRutas){

	this.insertarPedido = InsertarPedido;
	this.traerTodos = TraerTodos;
	this.borrarPedido = BorrarPedido;
	this.modificarPedido = ModificarPedido;

	var url = factoryRutas.RutaPedidos;

	function InsertarPedido(pedido){
		return $http.post(url + pedido)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function ModificarPedido(pedido){
		console.log(pedido);
		return $http.put(url + pedido)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerTodos(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function BorrarPedido(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};
})

.service('SrvOfertas', function ($http, factoryRutas){

	this.insertarOferta = InsertarOferta;
	this.modificarOferta = ModificarOferta;
	this.traerTodas = TraerTodas;
	this.borrarOferta = BorrarOferta;

	var url = factoryRutas.RutaOfertas;

	function InsertarOferta(oferta){
		return $http.post(url + oferta)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function ModificarOferta(oferta){
		return $http.put(url + oferta)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerTodas(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function BorrarOferta(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};
})

.service('SrvEncuestas', function ($http, factoryRutas){

	this.insertarEncuesta = InsertarEncuesta;
	this.traerTodas = TraerTodas;
	this.borrarEncuesta = BorrarEncuesta;
	this.traerUrlFotos = TraerUrlFotos;

	var url = factoryRutas.RutaEncuestas;

	function InsertarEncuesta(encuesta){
		return $http.post(url + encuesta)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerTodas(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function BorrarEncuesta(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerUrlFotos(){
		return factoryRutas.RutaFotos;
	};

	

})


.service('SrvProductos', function ($http, factoryRutas){

	this.insertarProducto = InsertarProducto;
	this.traerTodos = TraerTodos;
	this.traerUno = TraerUno;
	this.borrarProducto = BorrarProducto;
	this.modificarProducto = ModificarProducto;
	this.traerUrlFotos = TraerUrlFotos;
	
	var url = factoryRutas.RutaProductos;
	
	function InsertarProducto(producto){
		return $http.post(url + producto)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function ModificarProducto(producto){
		return $http.put(url + producto)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerTodos(){
		return $http.get(url)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function TraerUno(id){
		return $http.get(url+id)
			.then(function (respuesta){
				return respuesta;
			}).catch(function (error){
				console.info("error", error);
			})
	};

	function BorrarProducto(id){
		return $http.delete(url + id)
			.then(function (respuesta){
				console.log(respuesta);
			}).catch(function (error){
				console.log(error);
			})
	};

	function TraerUrlFotos(){
		return factoryRutas.RutaFotos;
	};
})
;