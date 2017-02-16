<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;


$DatosDelModeloPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModeloPorPost);
if($user->usuario == 'usuario' && $user->clave == 'clave'){
	$key = "1234";
	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"] ="unUsuario";
	$token["perfil"]="admin";
	$token["iat"]=time(); //momento en el cual se creo
	$token["exp"]=time()+20;
	$token["username"] = "usuario";
	$token["tipoUsuario"] = "admin";
	$jwt = JWT::encode($token, $key);
	$array["MiTokenGeneradorEnPHP"] = $jwt;
}
else{
	$array["MiTokenGeneradorEnPHP"] = false;
}


echo json_encode($array);
?>