<?php
require_once"accesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pedido;
	public $id_cliente;
 	public $fecha;
  	public $monto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdPedido()
	{
		return $this->id_pedido;
	}
	public function GetIdCliente()
	{
		return $this->id_cliente;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	public function GetMonto()
	{
		return $this->monto;
	}

	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
	public function SetMonto($valor)
	{
		$this->monto = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Pedido::TraerUnPedido($id);
			
			$this->nombre = $obj->nombre;
			$this->tamano = $obj->tamano;
			$this->tipo = $obj->tipo;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->tipo." de ".$this->nombre." ".$this->tamano;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedido($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pedido where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnPedido(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$PedidoBuscada= $consulta->fetchObject('Pedido');
		return $PedidoBuscada;	
					
	}
	
	public static function TraerTodasLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pedido");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLosPedidos() ");
		$consulta->execute();			
		$arrPedidos= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrPedidos;
	}
	
	public static function BorrarPedido($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from Pedido	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPedido(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPedido($Pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update Pedido 
				set nombre=:nombre,
				tipo=:tipo,
				tamano=:tamano
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPedido(:id_pedido,:id_cliente,:fecha,:monto)");
			$consulta->bindValue(':id_pedido',$Pedido->id, PDO::PARAM_INT);
			$consulta->bindValue(':id_cliente',$Pedido->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $Pedido->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':monto', $Pedido->tamano, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPedido($Pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Pedido (nombre,tipo,dni,tamano)values(:nombre,:tipo,:dni,:tamano)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPedido (,:id_cliente,:fecha,:monto)");
			$consulta->bindValue(':id_cliente',$Pedido->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $Pedido->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':monto', $Pedido->tamano, PDO::PARAM_STR);
			return $consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//

	


}
