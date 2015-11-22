angular.module('CustomizeService', []).factory(function($http) {
	return {
        helloTest : function(){
            alert('hello');   
        }  
    }
/*
	$scope.testRequest = function () {
		$http.get('/api/todos')
		        .success(function(data) {
		            $scope.todos = data;
		            console.log(data);
		        })
		   	    .error(function(data) {
			        console.log('Error: ' + data);
		});
	  });

	var testRequest = $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
   	    .error(function(data) {
	        console.log('Error: ' + data);
    });*/
});

