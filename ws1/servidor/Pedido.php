	<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idPed;
	public $idProd;
	public $idSuc;
	public $idCliente;
	public $monto;
	public $fechaPedido;
	public $cantPedida;
	public $estado;
  	//public $codFoto1

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdPedido()
	{
		return $this->idPed;
	}
  	public function GetIdProducto()
	{
		return $this->idProd;
	}
  	public function GetIdSucursal()
	{
		return $this->idSuc;
	}
	public function GetIdCliente()
	{
		return $this->idCliente;
	}
	public function GetMonto()
	{
		return $this->monto;
	}
	public function GetFechaPedido()
	{
		return $this->fechaPedido;
	}
	public function GetCantPedida()
	{
		return $this->cantPedida;
	}
	public function GetEstado()
	{
		return $this->estado;
	}

	/*public function getCodFoto1)
	{
		return $this->codFoto1
	}*/


	public function SetIdPedido($valor)
	{
		$this->idPed = $valor;
	}
	public function SetIdProducto($valor)
	{
		$this->idProd = $valor;
	}
	public function SetIdSucursal($valor)
	{
		$this->idSuc = $valor;
	}
	public function SetIdCliente($valor)
	{
		$this->idCliente = $valor;
	}
	public function SetMonto($valor)
	{
		$this->monto = $valor;
	}
	public function SetFechaPedido($valor)
	{
		$this->fechaPedido = $valor;
	}
	public function SetCantPedida($valor)
	{
		$this->cantPedida= $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado= $valor;
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
			$obj = pedido::TraerUnapedido($id);
			
			$this->idProd = $obj->idProd;
			$this->idSuc = $obj->idSuc;
			$this->idCliente = $obj->idCliente;
			$this->monto = $obj->monto;
			$this->fechaPedido = $obj->fechaPedido;
			$this->cantPedida = $obj->cantPedida;
			$this->estado = $obj->estado;
			//$this->codFoto1= $obj->codFoto1
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->idProd."-".$this->idSuc."-".$this->idCliente."-".$this->monto."-".$this->fechaPedido."-".$this->cantPedida."-".$this->estado;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedido($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				p.id_pedido, 
				p.id_sucursal,
				p.id_cliente,
				p.fechaPedido,
				p.estado,
				s.nombre as snombre,
				u.nombre as unombre,
				dp.cantidad,
				dp.id_producto,
				pr.nombre as pnombre
			FROM 
				pedidos as p, 
				misproductos as pr,
				sucursales as s,
				misusuarios as u,
				detalle_pedido as dp 
			WHERE p.id_pedido= :idPed AND
            	p.id_pedido = dp.id_pedido AND
                p.id_sucursal = s.id_sucursal AND
                p.id_cliente = u.id AND
                dp.id_producto = pr.id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':idPed', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$detalles = $consulta->fetchAll();

		$pedidoBuscado =  new stdClass();
		$pedidoBuscado->id_pedido = $detalles[0]['id_pedido'];
		$pedidoBuscado->id_sucursal = $detalles[0]['id_sucursal'];
		$pedidoBuscado->id_cliente = $detalles[0]['id_cliente'];
		$pedidoBuscado->fechaPedido = $detalles[0]['fechaPedido'];
		$pedidoBuscado->estado = $detalles[0]['estado'];
		$pedidoBuscado->snombre = $detalles[0]['snombre'];
		$pedidoBuscado->unombre = $detalles[0]['unombre'];
		$pedidoBuscado->productos = array();
		
		foreach($detalles as $d){
			$producto = new stdClass();
			$producto->id = $d['id_producto'];
			$producto->nombre = $d['pnombre'];
			$producto->cantidad = $d['cantidad'];

			array_push($pedidoBuscado->productos, $d);
		}


		return $pedidoBuscado;	
					
	}
	
	public static function TraerTodosLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidos ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrpedidoes= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrpedidoes;
	}
	
	public static function BorrarPedido($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedidos WHERE id_pedido=:idPed");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':idPed',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPedido($pedido, $estado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE pedidos 
				SET estado=:estado
				WHERE id_pedido=:idPed");
			$consulta->bindValue(':idPed',$pedido, PDO::PARAM_INT);
			$consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPedido($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		try {	
			$objetoAccesoDato->ComenzarTransaccion();
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedidos (id_sucursal,id_cliente,monto,fechaPedido,estado) values(:id_sucursal,:id_cliente,:monto,:fechaPedido,:estado)");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarpedido (:nombre,:nombre,:dni,:foto1,:foto1,:foto1,:codFoto1");
			$consulta->bindValue(':id_sucursal', $pedido->id_sucursal, PDO::PARAM_INT);
			$consulta->bindValue(':id_cliente', $pedido->id_cliente, PDO::PARAM_INT);
			$consulta->bindValue(':monto', $pedido->monto, PDO::PARAM_INT);
			$consulta->bindValue(':fechaPedido', $pedido->fechaPedido, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
			//$consulta->bindValue(':codFoto1, $pedido->codFoto1 PDO::PARAM_STR);
			$consulta->execute();		
			$id_pedido = $objetoAccesoDato->RetornarUltimoIdInsertado();

			foreach($pedido->productos as $ped){
				$sql = "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad)
						VALUES (".$id_pedido.",".$ped->id_producto.",".$ped->cantidad.");";
				//$sql->bindValue(':id_pedido', $id_pedido, PDO::PARAM_INT);
				//$sql->bindValue(':id_producto', $ped->id_producto, PDO::PARAM_INT);
				//$sql->bindValue(':cantidad', $ped->cantidad, PDO::PARAM_INT);
				$objetoAccesoDato->EjecutarTransaccion($sql);

			}

			$objetoAccesoDato->GuardarTransaccion();
			return $objetoAccesoDato->RetornarUltimoIdInsertado();
		} catch (PDOException $e){
			
			$objetoAccesoDato->RevertirTransaccion();
			return $e->getMessage();
		}
				
	}	
//--------------------------------------------------------------------------------//

	public static function VerPedidosPorMes(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				Count(p.id_pedido) as cantidad,
				MONTH(p.fechaPedido) as mes, 
				s.nombre,
				SUM(p.monto) as monto
			FROM pedidos as p, sucursales as s
			WHERE p.id_sucursal = s.id_sucursal AND
				p.fechaPedido > date_sub(now(), interval 12 MONTH) 
			GROUP BY MONTH(p.fechaPedido), s.nombre");

		$consulta->execute();
		return $consulta->fetchAll();
	}
}
