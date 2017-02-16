<?php
require_once"accesoDatos.php";
class DetallePedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pedido;
	public $id_pizza;
 	public $cantidad;
  	public $monto;
  	public $estado;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdPedido()
	{
		return $this->id_pedido;
	}
	public function GetIdPizza()
	{
		return $this->id_pizza;
	}
	public function GetCantidad()
	{
		return $this->cantidad;
	}
	public function GetMonto()
	{
		return $this->monto;
	}
	public function GetEstado()
	{
		return $this->estado;
	}

	public function SetIdPedido($valor)
	{
		$this->id_pedido = $valor;
	}
	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetCantidad($valor)
	{
		$this->cantidad = $valor;
	}
	public function SetMonto($valor)
	{
		$this->monto = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Pedido::TraerUnPedido($id_pedido, $id_pizza);
			$this->id_pedido = $id_pedido;
			$this->id_pizza = $id_pizza;
			$this->cantidad = $obj->cantidad;
			$this->monto = $obj->monto;
			$this->estado = $obj->estado;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id_pedido."-".$this->id_pizza."-".$this->cantidad."-".$this->monto."-".$this->estado;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnDetalle($id_pedido, $id_pizza) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pedido where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnDetalle(:id_pedido, :id_pizza)");
		$consulta->bindValue(':id_pedido', $id_pedido, PDO::PARAM_INT);
		$consulta->bindValue(':id_pizza', $id_pizza, PDO::PARAM_INT);
		$consulta->execute();
		$DetallePedidoBuscado= $consulta->fetchObject('Pedido');
		return $DetallePedidoBuscado;	
					
	}
	
	public static function TraerTodasLosDetalles()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from Pedido");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLosDetalles() ");
		$consulta->execute();			
		$arrDetallePedidos= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrDetallePedidos;
	}
	
	public static function BorrarDetalle($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from Pedido	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarDetalle(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarDetalle($DetallePedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update Pedido 
				set nombre=:nombre,
				tipo=:tipo,
				tamano=:tamano
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarDetalle(:id_pedido,:id_cliente,:fecha,:monto)");
			$consulta->bindValue(':id_pedido',$DetallePedido->id, PDO::PARAM_INT);
			$consulta->bindValue(':id_cliente',$DetallePedido->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $DetallePedido->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':monto', $DetallePedido->tamano, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarDetalle($DetallePedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Pedido (nombre,tipo,dni,tamano)values(:nombre,:tipo,:dni,:tamano)");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarDetalle (,:id_cliente,:fecha,:monto)");
			$consulta->bindValue(':id_cliente',$DetallePedido->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $DetallePedido->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':monto', $DetallePedido->tamano, PDO::PARAM_STR);
			return $consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//

	


}
