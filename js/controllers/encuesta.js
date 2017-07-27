angular.module("salaDeJuegosApp");

salaApp.controller('EncuestaCtrl', function($scope, SrvEncuestas, SrvPedidos, UsuarioActual, $state, $stateParams){

    if(!UsuarioActual.getCargo()){
        $state.go('usuario.login');
    } else if(UsuarioActual.getCargo() != 'comprador'){
      $state.go('menu.todos');
    }

    $scope.encuesta = {};

    $scope.encuesta.id_pedido = $stateParams['pedido'];

    $scope.enviarEncuesta = function(){
    $scope.encuesta.id_usuario = UsuarioActual.getId();
        console.log($scope.encuesta);
        $scope.encuesta.fecha = new Date();

        var encuesta = JSON.stringify($scope.encuesta);
        SrvEncuestas.insertarEncuesta(encuesta)
        .then(function(response){
            console.info(response);
            document.getElementById('gracias').style.display = 'block';

            SrvPedidos.modificarEstado($scope.encuesta.id_pedido, 'valorado');


        }).catch(function(error){
            console.error(error);
        })
    }

    $scope.irAMenu = function(){
        $state.go('menu.todos');
    }
});

