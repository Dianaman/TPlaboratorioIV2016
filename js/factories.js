angular.module('salaDeJuegosApp')
.factory('factoryRutas', function (){
	var objeto = {};

  objeto.nombre = "Factory de rutas";
  objeto.RutaOfertas = 'http://localhost:8000/TPlaboratorioIV2016/ws2/ofertas/';
  objeto.RutaPedidos = 'http://localhost:8000/TPlaboratorioIV2016/ws2/pedidos/';
  objeto.RutaProductos = 'http://localhost:8000/TPlaboratorioIV2016/ws2/productos/';
  objeto.RutaEncuestas = 'http://localhost:8000/TPlaboratorioIV2016/ws2/encuestas/';
  objeto.RutaSucursales = 'http://localhost:8000/TPlaboratorioIV2016/ws2/sucursales/';
  objeto.RutaUsuarios = 'http://localhost:8000/TPlaboratorioIV2016/ws2/usuarios/';
  objeto.RutaFotos = 'http://localhost:8000/TPlaboratorioIV2016/ws2/servidor/nexoFoto.php';

  return objeto;
})

.factory('UsuarioActual', [function(){

  var id = "";
  var nombre = "";
  var email = "";
  var cargo = "";

  return {
    login:function(userId,name,mail,job){
      id = userId;
      nombre = name;
      email = mail;
      cargo = job;
    },getId:function(){
      return id;
    },getName:function(){
      return nombre;
    },getEmail:function(){
      return email;
    },getCargo:function(){
      return cargo;
    },getFullData:function(){
      var jsonUsuario = {};
      jsonUsuario.id = id;
      jsonUsuario.nombre = nombre;
      jsonUsuario.email = email;
      jsonUsuario.cargo = cargo;

      return JSON.stringify(jsonUsuario);
    }
  };
}])

;