<?php
include_once('Clientes.php');
include_once('Pizzas.php');
include_once('Pedidos.php');
include_once('DetallePedidos.php');


require 'vendor/autoload.php';


$app = new Slim\App();


/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
**/
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});
/*********************************
 *********** CLIENTES ************         
 ********************************/


/*  GET: Para consultar y leer recursos */
$app->get('/usuarios[/]', function ($request, $response, $args) {
    $datos=Cliente::TraerTodosLosClientes();
    $response->write(json_encode($datos));
    
    return $response;
});

/* POST: Para crear recursos */
$app->post('/usuario/{cliente}', function ($request, $response, $args) {
    $cliente = json_decode($args['cliente']);
    Cliente::InsertarCliente($cliente);
    $response->write("ingresado", $cliente);
    var_dump($args);
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/usuario/{cliente}', function ($request, $response, $args) {
    $cliente = json_decode($args['cliente']);
    Cliente::ModificarCliente($cliente);
    $response->write("modificado", $args);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    echo $args['id'];
    Cliente::BorrarCliente($args['id']);
    $response->write("borrar !");
    return $response;
});

/*********************************
 ************ PIZZAS *************         
 ********************************/


/*  GET: Para consultar y leer recursos */
$app->get('/pizza[/]', function ($request, $response, $args) {
    $datos=Pizza::TraerTodasLasPizzas();
    $response->write(json_encode($datos));
    
    return $response;
});

/* POST: Para crear recursos */
$app->post('/pizza/{pizza}', function ($request, $response, $args) {
    $pizza = json_decode($args['pizza']);
    Pizza::InsertarPizza($pizza);
    $response->write("ingresado", $pizza);
    var_dump($args);
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/pizza/{pizza}', function ($request, $response, $args) {
    $pizza = json_decode($args['pizza']);
    Pizza::ModificarPizza($pizza);
    $response->write("modificado", $args);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/pizza/{id}', function ($request, $response, $args) {
    echo $args['id'];
    Pizza::BorrarPizza($args['id']);
    $response->write("borrar !");
    return $response;
});




$app->run();
