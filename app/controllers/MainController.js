app.controller('MainController', ['$scope', '$state', '$http', '$stateParams', '$timeout', '$sessionStorage', function($scope, $state, $http, $stateParams, $timeout, $sessionStorage){

	var fotos_uri = $('body').attr('services-img-uri');

	if ($sessionStorage.user) {
		$scope.userlogin = $sessionStorage.user;
		$(".navlogout").hide();
		$(".navlogin").show();
		// console.log($scope.userlogin);
	}else{
		$(".navlogout").show();
		$(".navlogin").hide();
	}


	if($state.current.name == 'home' ){

		$scope.listservices = '';

		$http.get('http://localhost:3000/api/services')
        .then(function(response){
        	$scope.listservices = response.data;
        	$scope.foto = fotos_uri;
        	// console.log(response);
        })

        .catch(function(error, status){
			$scope.empty = "";
	   		if(!status){
	   			$scope.empty = "Error de conexión... Intente mas tarde"; 
	   			// alert("vacio");
	   		}

		});

		$scope.logout = function() {}

 
	}

	if($state.current.name == 'newservice'){

		$scope.form = {};

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}

	
		$scope.new_service = function() {
			// console.log($scope.myFile);
			$scope.form.userid = $sessionStorage.user._id;
			var fd = new FormData;
			// var servicios = $scope.form;
		  	for ( var key in $scope.form ) {
		  		fd.append(key, $scope.form[key]);
		  	}

		  	var file = $("#imgInp")[0].files[0];
		  	// console.log(file, "file.....");

		  	fd.append('img', file);

		  	$http.post('http://localhost:3000/api/service', fd, {
		  		transformRequest: angular.identity,
		  		headers: {
		  			'Content-Type': undefined
		  		}
		  	}).then(function(res){
		  		// console.log(res);
		  		$scope.success = res.data.msg;
		  		$scope.service = res.data.service;
		  		// console.log($scope.service);
            	$timeout( function(){
            		$(".alert-success").toggle("hide");
            		$state.go('viewservice', {id: $scope.service._id});
            	}, 3000);
		  	}).catch(function(error){
				// console.log(error);
				$scope.message = error.data;
			});

		}
		
	}

	if($state.current.name == 'viewservice' ){


		// console.log($scope.form);
		$http.get('http://localhost:3000/api/service/'+$stateParams.id)
        .then(function(response){
        	$scope.myService = false;
        	$scope.service = response.data;
        	$scope.foto = fotos_uri;
   			$scope.form = {};
        	if ($sessionStorage.user) {
				if ($scope.service.user._id == $sessionStorage.user._id) {
		    		$scope.myService = true;
		    	}else {
		    		$scope.myService = false;
		    	}
			}

        })
        .catch(function(error){
        	$state.go('404error');
			// console.log(error);
			// $scope.message = error.data;

		});


		$scope.hireservice = function(serviceid){
			
			if (!$sessionStorage.user) {
				alert("Necesitas iniciar sesión...");
				$state.go('login');
			}else {
        		
        		$scope.form = {};
				$scope.form.serviceid = serviceid;
				$scope.form.userid = $sessionStorage.user._id;
				$http.post('http://localhost:3000/api/order', $scope.form)
		        .then(function(response){
		        	// console.log(response);
		        	$scope.success = response.data.msg;
		        	$timeout( function(){
	            		$(".alert-success").toggle("hide");
	            		$state.go('home');
	            	}, 2000);
		        	
		        })
		        .catch(function(error){
					console.log(error);
					$scope.message = error.data;

				});

        	}			

		};

		$scope.openMessage = function(){

			if (!$sessionStorage.user) {
				alert("Necesitas iniciar sesión...");
				// $('#messageModal').modal('hide');
				$state.go('login');
			}else{
				$("#messageModal").modal();
			}

		}

		$scope.messageTo = function(serviceid){

			if (!$sessionStorage.user) {
				alert("Necesitas iniciar sesión...");
				$('#messageModal').modal('hide');
				$state.go('login');
			}

			$scope.form.serviceid = serviceid;
			$scope.form.userid = $sessionStorage.user._id;
			$http.post('http://localhost:3000/api/user/message', $scope.form)
	        .then(function(response){
	        	console.log(response);
	        	$scope.success = response.data.msg;
	        	$('#messageModal').modal('hide');
	        	$timeout( function(){
            		$(".alert-success").toggle("hide");
            		$state.go('home');
            	}, 1500);
	        	
	        })
	        .catch(function(error){
				console.log(error);
				$scope.message = error.data;

			});

		};


	}

	if($state.current.name == 'profile' ){

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}
		// console.log($scope.form);
		$http.get('http://localhost:3000/api/user/'+$sessionStorage.user._id)
        .then(function(response){
        	console.log(response);
        	$scope.usuario = response.data;
        })
        .catch(function(error){
			console.log(error);
			$scope.message = error.data;

		});


	}

	if($state.current.name == 'orders' ){

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}
        // console.log("asdasdad");
    	$scope.orders = [];
    	$http.get('http://localhost:3000/api/orders/'+$sessionStorage.user._id)
        .then(function(response){
        	$scope.orders = response.data;
        	$scope.foto = fotos_uri;
        })
        .catch(function(error){
			console.log(error);
			$scope.empty = true;
			$scope.message = error.data;

		});
   
   		$scope.deleteOrder = function(order_id, service_id){

   			$http.get('http://localhost:3000/api/deleteOrder/'+order_id+'/'+service_id)
	        .then(function(response){
	        	$scope.success = response.data.msg;
	        	$timeout( function(){
            		$(".alert-success").toggle("hide");
            		$state.reload();
            	}, 1300);
	        })
	        .catch(function(error){
				console.log(error);
				$scope.message = error.data;

			});

   		}


	}

	if($state.current.name == 'user_services' ){

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}
        // console.log("asdasdad");
    	$scope.services = [];
    	$http.get('http://localhost:3000/api/servicesByUser/'+$sessionStorage.user._id)
        .then(function(response){
        	console.log(response);
        	$scope.services = response.data;
        	$scope.foto = fotos_uri;
        })
        .catch(function(error){
			console.log(error);
			$scope.message = error.data;

		});
   
   		$scope.deleteService = function(service_id){

   // 			$http.get('http://localhost:3000/api/deleteService/'+service_id)
	  //       .then(function(response){
	  //       	$scope.success = response.data.msg;
	  //       	$timeout( function(){
   //          		$(".alert-success").toggle("hide");
   //          		$state.reload();
   //          	}, 1300);
	  //       })
	  //       .catch(function(error){
			// 	console.log(error);
			// 	$scope.message = error.data;

			// });

   		}


	}

	if($state.current.name == 'myMessages' ){

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}
		// console.log($scope.form);
		$scope.messages = [];
		$http.get('http://localhost:3000/api/messages/'+$sessionStorage.user._id)
        .then(function(response){
        	console.log(response.data);
        	$scope.foto = fotos_uri;
        	$scope.messages = response.data;
        })
        .catch(function(error){
			console.log(error);
			$scope.message = error.data;

		});

		$scope.seeMessage = function(messageid){
			$http.get('http://localhost:3000/api/message/'+messageid)
	        .then(function(response){
	        	console.log(response.data);
	        	$scope.mensaje = response.data;
	        	$('#messageModal').modal();

	        })
	        .catch(function(error){
				console.log(error);
				$scope.message = error.data;

			});
		}

	}

	if($state.current.name == 'viewMessage' ){

		if (!$sessionStorage.user) {
			alert("Necesitas iniciar sesión...");
			$state.go('login');
		}
		// console.log($scope.form);
		$scope.messages = [];
		$http.get('http://localhost:3000/api/messages/'+$sessionStorage.user._id)
        .then(function(response){
        	console.log(response.data);
        	$scope.foto = fotos_uri;
        	$scope.messages = response.data;
        })
        .catch(function(error){
			console.log(error);
			$scope.message = error.data;

		});

		$scope.seeMessage = function(messageid){
			$http.get('http://localhost:3000/api/message/'+messageid)
	        .then(function(response){
	        	console.log(response.data);
	        	$scope.mensaje = response.data;
	        	$('#messageModal').modal();

	        })
	        .catch(function(error){
				console.log(error);
				$scope.message = error.data;

			});
		}

	}

}])