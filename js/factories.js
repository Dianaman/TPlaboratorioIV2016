angular.module('salaDeJuegosApp')
.factory('factoryRutas', function (){
	var objeto = {};
  objeto.nombre = "Factory de rutas";
  objeto.RutaOfertas = 'http://localhost/TPlaboratorioIV2016/ws1/ofertas/';
  objeto.RutaPedidos = 'http://localhost/TPlaboratorioIV2016/ws1/pedidos/';
  objeto.RutaProductos = 'http://localhost/TPlaboratorioIV2016/ws1/productos/';
  objeto.RutaEncuestas = 'http://localhost/TPlaboratorioIV2016/ws1/encuestas/';
  objeto.RutaSucursales = 'http://localhost/TPlaboratorioIV2016/ws1/sucursales/';
  objeto.RutaUsuarios = 'http://localhost/TPlaboratorioIV2016/ws1/usuarios/';
  objeto.RutaFotos = 'http://localhost/TPlaboratorioIV2016/ws1/servidor/nexoFoto.php';

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