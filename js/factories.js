angular.module('salaDeJuegosApp')
.factory('factoryRutas', function (){
	var objeto = {};
  objeto.nombre = "Factory de rutas";
  objeto.RutaAuth = 'http://localhost/TPlaboratorioIV2016/ws1/auth/';
  objeto.RutaOfertas = 'http://localhost/TPlaboratorioIV2016/ws1/ofertas/';
  objeto.RutaPedidos = 'http://localhost/TPlaboratorioIV2016/ws1/pedidos/';
  objeto.RutaProductos = 'http://localhost/TPlaboratorioIV2016/ws1/productos/';
  objeto.RutaEncuestas = 'http://localhost/TPlaboratorioIV2016/ws1/encuestas/';
  objeto.RutaSucursales = 'http://localhost/TPlaboratorioIV2016/ws1/sucursales/';
  objeto.RutaUsuarios = 'http://localhost/TPlaboratorioIV2016/ws1/usuarios/';
  objeto.RutaEncargados = 'http://localhost/TPlaboratorioIV2016/ws1/encargados/';
  objeto.RutaFotos = 'http://localhost/TPlaboratorioIV2016/ws1/servidor/nexoFoto.php';

  return objeto;
})

.factory('UsuarioActual', [function(){

  var id = "";
  var nombre = "";
  var email = "";
  var cargo = "";
  var direccion = "";
  var localidad = "";
  var telefono = "";
  var estadoencuesta = "";

  return {
    login:function(user){
      id = user.id;
      nombre = user.nombre;
      email = user.correo;
      cargo = user.tipo;
      sucursal = user.id_sucursal;  
      direccion = user.direccion;
      localidad = user.localidad;
      telefono = user.telefono;
      estadoencuesta = user.estadoencuesta;

    },getId:function(){
      return id;
    },getName:function(){
      return nombre;
    },getEmail:function(){
      return email;
    },getCargo:function(){
      return cargo;
    },getEstadoEncuesta:function(){
      return estadoencuesta;
    },getFullData:function(){
      var jsonUsuario = {};
      jsonUsuario.id = id;
      jsonUsuario.nombre = nombre;
      jsonUsuario.email = email;
      jsonUsuario.cargo = cargo;

      return JSON.stringify(jsonUsuario);
    },logout:function(){
      id = "";
      nombre = "";
      email = "";
      cargo = ""
    }
  };
}])

;