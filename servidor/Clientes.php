<?php
require_once"accesoDatos.php";
class Cliente
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $email;
  	public $direccion;
  	public $telefono;

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
	public function GetEmail()
	{
		return $this->email;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}

	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($email=NULL)
	{
		if($email != NULL){
			$obj = cliente::TraerUnCliente($email);
			
			$this->direccion = $obj->direccion;
			$this->nombre = $obj->nombre;
			$this->email = $email;
			$this->telefono = $obj->telefono;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->email."-".$this->direccion."-".$this->telefono;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnCliente($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from cliente where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnCliente(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$clienteBuscada= $consulta->fetchObject('cliente');
		return $clienteBuscada;	
					
	}
	
	public static function TraerTodasLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from cliente");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLosClientes() ");
		$consulta->execute();			
		$arrClientes= $consulta->fetchAll(PDO::FETCH_CLASS, "cliente");	
		return $arrClientes;
	}
	
	public static function Borrarcliente($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from cliente	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL Borrarcliente(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Modificarcliente($cliente)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update cliente 
				set nombre=:nombre,
				direccion=:direccion,
				telefono=:telefono
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL Modificarcliente(:id,:nombre,:direccion,:telefono)");
			$consulta->bindValue(':id',$cliente->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$cliente->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':direccion', $cliente->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':telefono', $cliente->telefono, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Insertarcliente($cliente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into cliente (nombre,direccion,email,telefono)values(:nombre,:direccion,:email,:telefono)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarcliente (:nombre,:direccion,:email,:telefono)");
		$consulta->bindValue(':nombre',$cliente->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':direccion', $cliente->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':email', $cliente->email, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $cliente->telefono, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerClientesTest()
	{
		$arrayDeClientes=array();

		$cliente = new stdClass();
		$cliente->id = "4";
		$cliente->nombre = "rogelio";
		$cliente->direccion = "agua";
		$cliente->email = "333333";
		$cliente->telefono = "333333.jpg";

		//$objetJson = json_encode($cliente);
		//echo $objetJson;
		$cliente2 = new stdClass();
		$cliente2->id = "5";
		$cliente2->nombre = "Bañera";
		$cliente2->direccion = "giratoria";
		$cliente2->email = "222222";
		$cliente2->telefono = "222222.jpg";

		$cliente3 = new stdClass();
		$cliente3->id = "6";
		$cliente3->nombre = "Julieta";
		$cliente3->direccion = "Roberto";
		$cliente3->email = "888888";
		$cliente3->telefono = "888888.jpg";

		$arrayDeClientes[]=$cliente;
		$arrayDeClientes[]=$cliente2;
		$arrayDeClientes[]=$cliente3;
		 
		

		return  $arrayDeClientes;
				
	}	


}
