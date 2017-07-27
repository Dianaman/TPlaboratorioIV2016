angular.module("salaDeJuegosApp");

salaApp.controller('EncuestaCtrl', function($scope, SrvEncuestas){
    $scope.encuesta = {};

    $scope.enviarEncuesta = function(){
        SrvEncuestas.insertarEncuesta($scope.encuesta)
        .then(function(response){
            console.info(response);
            document.getElementById('gracias').style.display = 'block';
            document.getElementById('encuesta').style.display = 'block';
        })
    }
});

