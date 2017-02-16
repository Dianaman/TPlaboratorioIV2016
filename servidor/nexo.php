<?php
	include "Personas.php";

	if ( !empty( $_FILES ) ) 
{
    $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
    $ruta = "..". DIRECTORY_SEPARATOR . 'fotosViejas' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $temporal, $ruta );
    echo "correcto";
}
if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}	

} else{

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	switch($respuesta->datos->accion)
	{
		case "borrar":
		{
			unlink("../fotos/".$respuesta->datos->persona->foto1);
			unlink("../fotos/".$respuesta->datos->persona->foto2);
			unlink("../fotos/".$respuesta->datos->persona->foto3);
			Persona::BorrarPersona($respuesta->datos->persona->id);
			break;
		}
		case "insertar":
		{
			var_dump($respuesta->datos->persona);


			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto1;
			$rutaNueva=$respuesta->datos->persona->dni." - 1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto1=$rutaNueva;

			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto2;
			$rutaNueva=$respuesta->datos->persona->dni." - 2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto2=$rutaNueva;

			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto3;
			$rutaNueva=$respuesta->datos->persona->dni." - 3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto3=$rutaNueva;


			echo Persona::InsertarPersona($respuesta->datos->persona);
			break;
		}
		case "buscar":
		{
			echo json_encode(Persona::TraerUnaPersona($respuesta->datos->id));
			break;
		}
		case "modificar":
		{
			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto1;
			$rutaNueva=$respuesta->datos->persona->dni." - 1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto1=$rutaNueva;

			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto2;
			$rutaNueva=$respuesta->datos->persona->dni." - 2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto2=$rutaNueva;

			$rutaVieja="../fotosViejas/".$respuesta->datos->persona->foto3;
			$rutaNueva=$respuesta->datos->persona->dni." - 3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			copy($rutaVieja, "../fotos/".$rutaNueva);
			$respuesta->datos->persona->foto3=$rutaNueva;
			
			Persona::ModificarPersona($respuesta->datos->persona);
			break;
		}
	}	


}

 ?>