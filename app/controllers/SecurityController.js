app.controller('SecurityController', ['$scope', '$state', '$http', '$timeout', '$sessionStorage', function($scope, $state, $http, $timeout, $sessionStorage){
	if($state.current.name == 'login'){

		$scope.user_login = function() {
			// console.log($scope.form);
			$http.post('http://localhost:3000/api/auth/login', $scope.form)
            .then(function(response){
            	$sessionStorage.user = response.data.user;
            	$scope.success = response.data;
            	$timeout( function(){
            		$(".alert-success").toggle("hide");
            		$state.go('home');
            	}, 1500);
            	
            })
            .catch(function(error){
				console.log(error);
				if (!error.data) {
					$scope.message = {error: 'Problemas de conexión... Intente de nuevo mas tarde'};
					$timeout( function(){
            			$(".alert-danger").toggle("hide");
            		}, 2000);
				}else{
					$scope.message = error.data;
					$timeout( function(){
            			$(".alert-danger").toggle("hide");
            		}, 1500);
				}
				// $scope.message = error.data;
				// $timeout( function(){
    //         		$(".alert-danger").toggle("hide");
    //         	}, 3000);

			});

		}



	}

	if($state.current.name == 'register'){
		

		console.log($sessionStorage.user);

		$scope.user_register = function() {
			// console.log($scope.form);
			$http.post('http://localhost:3000/api/user', $scope.form)
            .then(function(response){
            	console.log(response);
            	$state.go('login');
            })
            .catch(function(error){
				console.log(error);
				$scope.message = error.data;

			});

		}

	}

	if($state.current.name == 'logout'){		

		console.log($sessionStorage);
		$sessionStorage.user = null;
		$state.go('home');

	}


}])
