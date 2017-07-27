<?php
require_once"AccesoDatos.php";
class Encuesta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_encuesta;
	public $id_cliente;
	public $puntuacion_producto;
	public $puntuacion_medio;
	public $puntuacion_rapidez;
	public $adicional;
	public $fecha;
  	//public $codFoto1

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdEncuesta()
	{
		return $this->id_encuesta;
	}
  	public function GetIdPedido()
	{
		return $this->idPed;
	}
	public function GetIdCliente()
	{
		return $this->id_cliente;
	}
	public function GetValorProducto()
	{
		return $this->$puntuacion_producto;
	}
	public function GetValorAtencion()
	{
		return $this->puntuacion_medio;
	}
	public function GetValorDemora()
	{
		return $this->puntuacion_rapidez;
	}
	public function GetComentario()
	{
		return $this->adicional;
	}

	/*public function getCodFoto1)
	{
		return $this->codFoto1
	}*/


	public function SetIdEncuesta($valor)
	{
		$this->id_encuesta = $valor;
	}
	public function SetIdPedido($valor)
	{
		$this->idPed = $valor;
	}
	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetValorProducto($valor)
	{
		$this->$puntuacion_producto = $valor;
	}
	public function SetValorAtencion($valor)
	{
		$this->puntuacion_medio = $valor;
	}
	public function SetValorDemora($valor)
	{
		$this->puntuacion_rapidez = $valor;
	}
	public function SetComentario($valor)
	{
		$this->adicional= $valor;
	}

	/*public function SetCodFoto1$valor)
	{
		$this->codFoto1= $valor;
	}*/
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Encuesta::TraerUnaEncuesta($id);
			
			$this->id_cliente = $obj->id_cliente;
			$this->$puntuacion_producto = $obj->$puntuacion_producto;
			$this->puntuacion_medio = $obj->puntuacion_medio;
			$this->puntuacion_rapidez = $obj->puntuacion_rapidez;
			$this->adicional = $obj->adicional;
			$this->fecha = $obj->fecha;
			//$this->codFoto1= $obj->codFoto1
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id_encuesta."-".$this->id_cliente."-".$this->$puntuacion_producto."-".$this->puntuacion_medio."-".$this->puntuacion_rapidez."-".$this->adicional;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaEncuesta($idusuario) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT * FROM encuestas 
			WHERE id_usuario=:idusuario
			ORDER BY fecha DESC
			LIMIT 1");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_INT);
		$consulta->execute();
		$encuestaBuscada= $consulta->fetchObject('encuesta');
		return $encuestaBuscada;	
					
	}

	public static function TraerEncuestas(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT 
			puntuacion_producto, 
			puntuacion_medio, 
			puntuacion_rapidez, 
			u.nombre as nombre,
			id_pedido
		 FROM encuestas, misusuarios as u
		 WHERE u.id = encuestas.id_usuario");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();
		$arrEncuestas= $consulta->fetchAll();	
		return $arrEncuestas;
	}
	
	public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				AVG(puntuacion_producto) as puntuacion_producto, 
				AVG(puntuacion_medio) as puntuacion_medio, 
				AVG(puntuacion_rapidez) as puntuacion_rapidez, 
				ROUND(MONTH(fecha), 1) as mes
			FROM encuestas
			GROUP BY MONTH(fecha)
			");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrEncuestas= $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");	
		return $arrEncuestas;
	}
	
	public static function BorrarEncuesta($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM encuestas WHERE id_encuesta=:id_encuesta");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id_encuesta',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Modificarencuesta($encuesta)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE encuestas 
				SET id_usuario=:id_usuario,
				puntuacion_producto=:puntuacion_producto,
				puntuacion_medio=:puntuacion_medio,
				puntuacion_rapidez=:puntuacion_rapidez,
				adicional=:adicional,
				fecha=:fecha
				WHERE id_encuesta=:id_encuesta");
			$consulta->bindValue(':id_encuesta',$encuesta->id_encuesta, PDO::PARAM_INT);
			$consulta->bindValue(':id_usuario', $encuesta->id_usuario, PDO::PARAM_INT);
			$consulta->bindValue(':puntuacion_producto', $encuesta->$puntuacion_producto, PDO::PARAM_INT);
			$consulta->bindValue(':puntuacion_medio', $encuesta->puntuacion_medio, PDO::PARAM_INT);
			$consulta->bindValue(':puntuacion_rapidez', $encuesta->puntuacion_rapidez, PDO::PARAM_INT);
			$consulta->bindValue(':adicional', $encuesta->adicional, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $encuesta->fecha, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarEncuesta($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("
			INSERT INTO encuestas 
				(id_usuario,
				puntuacion_producto,
				puntuacion_rapidez,
				puntuacion_medio,
				adicional,
				id_pedido,
				fecha)
			VALUES(
				:id_usuario,
				:puntuacion_producto,
				:puntuacion_rapidez,
				:puntuacion_medio,
				:adicional,
				:id_pedido,
				:fecha)");
		$consulta->bindValue(':id_usuario', $encuesta->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':puntuacion_producto', $encuesta->puntuacion_producto, PDO::PARAM_INT);
		$consulta->bindValue(':puntuacion_rapidez', $encuesta->puntuacion_rapidez, PDO::PARAM_INT);
		$consulta->bindValue(':puntuacion_medio', $encuesta->puntuacion_medio, PDO::PARAM_INT);
		$consulta->bindValue(':adicional', $encuesta->adicional, PDO::PARAM_STR);
		$consulta->bindValue(':id_pedido', $encuesta->id_pedido, PDO::PARAM_INT);
		$consulta->bindValue(':fecha', $encuesta->fecha, PDO::PARAM_STR);
		//$consulta->bindValue(':codFoto1, $encuesta->codFoto1 PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
