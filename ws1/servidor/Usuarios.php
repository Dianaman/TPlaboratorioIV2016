<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
  	public $correo;
  	public $clave;
  	public $tipo;
  	public $habilitado;
  	public $id_sucursal;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdUsuario()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetEmail()
	{
		return $this->correo;
	}
	public function GetClave()
	{
		return $this->clave;
	}
	public function GetCargo()
	{
		return $this->tipo;
	}
	public function GetHabilitado()
	{
		return $this->habilitado;
	}
  	public function GetIdSucursal()
	{
		return $this->id_sucursal;
	}

	// public function getFoto()
	// {
	// 	return $this->foto;
	// }


	public function SetIdUsuario($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEmail($valor)
	{
		$this->correo = $valor;
	}
	public function SetClave($valor)
	{
		$this->clave = $valor;
	}
	public function SetCargo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetHabilitado($valor)
	{
		$this->habilitado = $valor;
	}
	public function SetIdSucursal($valor)
	{
		$this->id_sucursal = $valor;
	}

	// public function SetFoto($valor)
	// {
	// 	$this->foto = $valor;
	// }
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Usuario::TraerUnUsuario($id);
			
			$this->id = $obj->$id;
			$this->nombre = $obj->nombre;
			$this->correo = $obj->correo;
			$this->clave = $obj->clave;
			$this->tipo = $obj->tipo;
			$this->habilitado = $obj->habilitado;
			$this->id_sucursal = $obj->id_sucursal;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->correo."-".$this->clave."-".$this->tipo."-".$this->habilitado."-".$this->id_sucursal;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misusuarios WHERE id=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
					
	}

	public static function TraerUnUsuarioPorSucursal($id_sucursalursal) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
			u.nombre, u.correo 
			FROM 
			misusuarios as u, 
			sucursales as s 
			WHERE 
			u.id = s.encargado 
			AND s.id_sucursal=:id_sucursal");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id_sucursal', $id_sucursalursal, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
					
	}
	
	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				id, correo, nombre, tipo, misusuarios.id_sucursal, foto, estadoencuesta, 
				(SELECT COUNT(pedidos.id_pedido) 
				FROM pedidos WHERE pedidos.id_cliente = misusuarios.id 
				GROUP BY pedidos.id_cliente) as pedidosRealizados, 
				(SELECT COUNT(encuestas.id_encuesta)  
				FROM encuestas WHERE encuestas.id_usuario = misusuarios.id 
				GROUP BY encuestas.id_usuario) as encuestasRealizadas
				FROM misusuarios");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrUsuarios;
	}

	public static function TraerTodosLosEncargados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misusuarios WHERE tipo = 'encargado'");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");	
		return $arrUsuarios;
	}


	public static function AutenticarUsuario($mailUsuario, $nombreUsuario, $claveUsuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misusuarios WHERE correo=:correo AND nombre=:nombre AND clave=:clave");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->bindValue(':correo', $mailUsuario, PDO::PARAM_STR);
		$consulta->bindValue(':nombre', $nombreUsuario, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $claveUsuario, PDO::PARAM_STR);
		$consulta->execute();			
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
	}

	public static function LogearUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM misusuarios WHERE correo=:correo AND clave=:clave");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->execute();			
		$usuarioBuscado= $consulta->fetchObject('Usuario');
		return $usuarioBuscado;
	}
	
	public static function BorrarUsuario($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM misusuarios WHERE id=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE misusuarios 
				SET nombre=:nombre,
				correo=:correo,
				clave=:clave,
				tipo=:tipo,
				habilitado=:habilitado,
				id_sucursal=:id_sucursal
				WHERE id=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarUsuario(:id,:nombre,:nombre,:correo,:clave,:tipo)");
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
			$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':habilitado', $usuario->habilitado, PDO::PARAM_INT);
			$consulta->bindValue(':id_sucursal', $usuario->id_sucursal, PDO::PARAM_INT);
			//$consulta->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into misusuarios (nombre,correo,clave,tipo,habilitado,id_sucursal) values(:nombre,:correo,:clave,:tipo,:habilitado,:id_sucursal)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarUsuario (:nombre,:nombre,:dni,:correo,:clave,:tipo,:codFoto)");
		$consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':habilitado', $usuario->habilitado, PDO::PARAM_INT);
		$consulta->bindValue(':id_sucursal', $usuario->id_sucursal, PDO::PARAM_INT);
		//$consulta->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	public static function ModificarEstadoEncuesta($usuarioId, $estado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			UPDATE misusuarios
			SET estadoencuesta = :estado
			WHERE id = :idUsu
			");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarUsuario (:nombre,:nombre,:dni,:correo,:clave,:tipo,:codFoto)");
		$consulta->bindValue(':idUsu', $usuarioId, PDO::PARAM_INT);
		$consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
//--------------------------------------------------------------------------------//


}
