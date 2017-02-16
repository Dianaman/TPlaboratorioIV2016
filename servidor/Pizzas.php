<?php
require_once"accesoDatos.php";
class Pizza
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $tamano;
  	public $tipo;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetTamano()
	{
		return $this->tamano;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}

	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetTamano($valor)
	{
		$this->tamano = $valor;
	}
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Pizza::TraerUnaPizza($id);
			
			$this->nombre = $obj->nombre;
			$this->tamano = $obj->tamano;
			$this->tipo = $obj->tipo;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
		$unapizza = '';
		if($this->tipo == 'pizza' || $this->tipo == 'empanada'){
			$unapizza += $this->tipo." de ";
		}
		$unapizza += $this->nombre;
		if($this->tipo != '' && $this->tipo != NULL){
			$unapizza += " ".$this->tamano;
		}
	  	return $unapizza;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPizza($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pizza where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPizza(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$PizzaBuscada= $consulta->fetchObject('Pizza');
		return $PizzaBuscada;	
					
	}
	
	public static function TraerTodasLasPizzas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pizza");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPizzas() ");
		$consulta->execute();			
		$arrPizzas= $consulta->fetchAll(PDO::FETCH_CLASS, "Pizza");	
		return $arrPizzas;
	}
	
	public static function BorrarPizza($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from Pizza	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPizza(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPizza($Pizza)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update Pizza 
				set nombre=:nombre,
				tipo=:tipo,
				tamano=:tamano
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPizza(:id,:nombre,:tipo,:tamano)");
			$consulta->bindValue(':id',$Pizza->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$Pizza->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $Pizza->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':tamano', $Pizza->tamano, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPizza($Pizza)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Pizza (nombre,tipo,dni,tamano)values(:nombre,:tipo,:dni,:tamano)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPizza (:nombre,:tipo,:dni,:tamano)");
		$consulta->bindValue(':nombre',$Pizza->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $Pizza->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $Pizza->dni, PDO::PARAM_STR);
		$consulta->bindValue(':tamano', $Pizza->tamano, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//

	


}
