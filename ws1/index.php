<?php
use Slim\Http\Headers;
header('Content-Type: image/jpeg');
include_once('servidor/Usuarios.php');
include_once('servidor/Sucursal.php');
include_once('servidor/Pedido.php');
include_once('servidor/Ofertas.php');
include_once('servidor/Productos.php');
include_once('servidor/Encuesta.php');


require 'vendor/autoload.php';



$app = new Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8000/TPlaboratorioIV2016/')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/auth/{usuario}', function ($request, $response, $args) {
    $user = json_decode($args['usuario']);
    $datos = Usuario::LogearUsuario($user);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/ofertas[/]', function ($request, $response, $args) {
    $datos = Oferta::TraerTodasLasOfertas();
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/ofertas/{id}', function ($request, $response, $args) {
    $datos = Oferta::TraerUnaOferta($args['id']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/pedidos[/]', function ($request, $response, $args) {
    $datos = Pedido::TraerTodosLosPedidos();
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/pedidos/{id}', function ($request, $response, $args) {
    $datos = Pedido::TraerUnPedido($args['id']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/encuestas[/]', function ($request, $response, $args) {
    $datos = Encuesta::TraerTodasLasEncuestas();
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/productos[/]', function ($request, $response, $args) {
    $datos = Producto::TraerTodosLosProductos();
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/productos/{prod}/{suc}', function ($request, $response, $args) {
    $datos = Producto::TraerUnProducto($args['prod'], $args['suc']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/sucursales[/]', function ($request, $response, $args) {
    $datos = Sucursal::TraerTodasLasSucursales();
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/sucursales/{id}', function ($request, $response, $args) {
    $datos = Sucursal::TraerUnaSucursal($args['id']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/encargados[/]', function ($request, $response, $args) {
    
    $datos = Usuario::TraerTodosLosEncargados();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    
    $datos = Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/usuarios/{id}', function ($request, $response, $args) {
    $datos = Usuario::TraerUnUsuario($args['id']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/usuarios/sucursal/{id}', function ($request, $response, $args) {
    $datos = Usuario::TraerUnUsuarioPorSucursal($args['id']);
    $response->write(json_encode($datos)); 
    
    return $response;
});

$app->get('/pedidospormes[/]', function($request, $response,$args) {
    $datos = Pedido::VerPedidosPorMes();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/encuestas/{idusuario}', function($request, $response,$args) {
    $datos = Encuesta::TraerUnaEncuesta($args['idusuario']);
    $response->write(json_encode($datos));

    return $response;
});



$app->post('/ofertas/{objeto}', function ($request, $response, $args) {
    $oferta = json_decode($args['objeto']);

    Oferta::InsertarOferta($oferta);
    
    $response->write($args['objeto']);
});

$app->post('/pedidos/{objeto}', function ($request, $response, $args) {
    $pedido = json_decode($args['objeto']);

    Pedido::InsertarPedido($pedido);
    
    $response->write($args['objeto']);
});

$app->post('/encuestas/{objeto}', function ($request, $response, $args) {
    $encuesta = json_decode($args['objeto'], true);

    Encuesta::InsertarEncuesta($encuesta);
    
    $response->write($args['objeto']);
});

$app->post('/productos/{objeto}', function ($request, $response, $args) {
    $producto = json_decode($args['objeto']);
    $response = Producto::InsertarProducto($producto);
    

    return $response;
});

$app->post('/sucursales/{objeto}', function ($request, $response, $args) {
    $sucursal = json_decode($args['objeto']);

    Sucursal::InsertarSucursal($sucursal);
    
    $response->write($args['objeto']);
});


$app->post('/usuarios/{objeto}', function ($request, $response, $args) {

    $usuario = json_decode($args['objeto']);

    Usuario::InsertarUsuario($usuario);
    
    $response->write($args['objeto']);
}); 

$app->put('/estadoEncuesta/{id}/{estado}', function($request, $response, $args){
    Usuario::ModificarEstadoEncuesta($args['id'], $args['estado']);
});

$app->put('/ofertas/{objeto}', function ($request, $response, $args) {

    $oferta = json_decode($args['objeto']);

    
    Oferta::ModificarOferta($oferta);
    
    $response->write($args['objeto']);
});

$app->put('/pedidos/{objeto}', function ($request, $response, $args) {

    $pedido = json_decode($args['objeto']);
    
    Pedido::ModificarPedido($pedido);
    
    $response->write($args['objeto']);
});

$app->put('/encuestas/{objeto}', function ($request, $response, $args) {

    $encuesta = json_decode($args['objeto']);

    
    Encuesta::ModificarEncuesta($encuesta);
    
    $response->write($args['objeto']);
});

$app->put('/productos/{objeto}', function ($request, $response, $args) {

    $producto = json_decode($args['objeto']);

    
    Producto::ModificarProducto($producto);
    
    $response->write($args['objeto']);
});

$app->put('/sucursales/{objeto}', function ($request, $response, $args) {

    $sucursal = json_decode($args['objeto']);

    
    Sucursal::ModificarSucursal($sucursal);
    
    $response->write($args['objeto']);
});

$app->put('/usuarios/{objeto}', function ($request, $response, $args) {

    $usuario = json_decode($args['objeto']);

    
    Usuario::ModificarUsuario($usuario);
    
    $response->write($args['objeto']);
});


$app->delete('/ofertas/{id}', function ($request, $response, $args) {
    Oferta::BorrarOferta($args['id']);
    return $response;
});

$app->delete('/pedidos/{id}', function ($request, $response, $args) {
    Pedido::BorrarPedido($args['id']);
    return $response;
});

$app->delete('/encuestas/{id}', function ($request, $response, $args) {
    Encuesta::BorrarEncuesta($args['id']);
    return $response;
});

$app->delete('/productos/{id}', function ($request, $response, $args) {
    Producto::BorrarProducto($args['id']);
    return $response;
});

$app->delete('/sucursales/{id}', function ($request, $response, $args) {
    Sucursal::BorrarSucursal($args['id']);
    return $response;
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
    $response = Usuario::BorrarUsuario($args['id']);
    return $response;
});


$app->run();
