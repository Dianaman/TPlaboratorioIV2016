<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idProd;
	public $nombre;
	public $precio;
	public $foto1;
	public $foto2;
	public $foto3;
  	//public $codFoto1

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdProducto()
	{
		return $this->idProd;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}

	/*public function getCodFoto1)
	{
		return $this->codFoto1
	}*/


	public function SetIdProducto($valor)
	{
		$this->idProd = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
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
			$obj = Producto::TraerUnProducto($id);
			
			$this->nombre = $obj->nombre;
			$this->precio = $obj->precio;
			//$this->codFoto1= $obj->codFoto1
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->precio."-";
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idProducto, $idSucursal) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				p.nombre, p.id, p.descripcion, p.tipo, p.foto1, p.foto2, p.foto3,
				s.nombre as snombre, s.id_sucursal, ps.precio
			FROM 
				producto_sucursal as ps, 
				sucursales as s, 
				misproductos as p 
			WHERE 
				ps.id_sucursal = s.id_sucursal 
				AND p.id = ps.id_producto 
				AND ps.id_producto = :idProd
				AND ps.id_sucursal = :idSuc");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':idProd', $idProducto, PDO::PARAM_INT);
		$consulta->bindValue(':idSuc', $idSucursal, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Producto');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				p.nombre, p.id, p.descripcion, p.tipo, p.foto1, p.foto2, p.foto3,
				s.nombre as snombre, s.id_sucursal, ps.precio
			FROM 
				producto_sucursal as ps, 
				sucursales as s, 
				misproductos as p 
			WHERE 
				ps.id_sucursal = s.id_sucursal 
				AND p.id = ps.id_producto
		");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");	
		return $arrProductos;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM misproductos WHERE id_producto=:idProd");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':idProd',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE 
					producto_sucursal as ps, 
					sucursales as s, 
					misproductos as p
				SET 
					p.nombre=:nombre, p.descripcion=:descripcion, p.tipo=:tipo, 
					p.foto1=:foto1, p.foto2=:foto2, p.foto3=:foto3, ps.precio=:precio
				WHERE 
					ps.id_sucursal = s.id_sucursal 
					AND p.id = ps.id_producto 
					AND ps.id_producto = :idProd
					AND ps.id_sucursal = :idSuc");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarProducto(:id,:nombre,:nombre,:foto1,:foto1,:foto1)");
			$consulta->bindValue(':idProd',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':idSuc',$producto->id_sucursal, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_INT);
			$consulta->bindValue(':foto1', $producto->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2', $producto->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3', $producto->foto3, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		try {
			$objetoAccesoDato->ComenzarTransaccion();
			$consulta = $objetoAccesoDato->RetornarConsulta("
				INSERT INTO misproductos (nombre, tipo, descripcion) 
				VALUES (:nombre,:tipo,:descripcion);");// :foto1, :foto2, :foto3);");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarProducto (:nombre,:nombre,:dni,:foto1,:foto1,:foto1,:codFoto1");
			$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
			//$consulta->bindValue(':foto1', $producto->foto1, PDO::PARAM_STR);
			//$consulta->bindValue(':foto2', $producto->foto2, PDO::PARAM_STR);
			//$consulta->bindValue(':foto3', $producto->foto3, PDO::PARAM_STR);

			$consulta->execute();
			$id_producto = $objetoAccesoDato->RetornarUltimoIdInsertado();

			$consulta2 = $objetoAccesoDato->RetornarConsulta("
				INSERT INTO producto_sucursal (id_producto, id_sucursal, precio)
					VALUES (:id_producto, :id_sucursal, :precio);");

			$producto->id_sucursal = $producto->productos_sucursal[0]->id_sucursal;
			$producto->precio = $producto->productos_sucursal[0]->precio;

			$consulta2->bindValue(':id_producto', $id_producto, PDO::PARAM_INT);
			$consulta2->bindValue(':id_sucursal', $producto->id_sucursal, PDO::PARAM_INT);
			$consulta2->bindValue(':precio', $producto->precio, PDO::PARAM_INT);

			var_dump($consulta2->execute());		

			$objetoAccesoDato->GuardarTransaccion();

			return $objetoAccesoDato->RetornarUltimoIdInsertado();
		
		} catch (PDOException $e){
			
			$objetoAccesoDato->RevertirTransaccion();
			return $e->getMessage();
		}
	}	
//--------------------------------------------------------------------------------//


}
