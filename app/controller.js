var path_views = './app/views';

var app = angular.module('app', ['ui.router', 'ngStorage']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
        .state('home', {
            url: '/',
            views: {
                    '' : { 
                        templateUrl: path_views+'/dashboard.html',
                        controller: 'MainController'
                    },

                    'navigation@home' : { 
                        templateUrl: path_views+'/templates/index_options.html'
                    }
            }
        })
        .state('login', {
            url: '/auth/login',
            templateUrl: path_views+'/login.html',
            controller: 'SecurityController'
        })
        .state('logout', {
            url: '/auth/logout',
            controller: 'SecurityController'
        })
        .state('register', {
            url: '/auth/register',
            templateUrl: path_views+'/register.html',
            controller: 'SecurityController'
        })
        .state('404error', {
            url: '/404',
            templateUrl: path_views+'/404page.html'
        })


        /* Services functions */        
        .state('newservice', {
                url: '/services/new',
                templateUrl: path_views+'/new_service.html',
                controller: 'MainController'
        })
        .state('viewservice', {
                url: '/service/:id',
                templateUrl: path_views+'/service_view.html',
                controller: 'MainController'
        })
        .state('hireservice', {
                url: '/hire/service/:id',
                templateUrl: path_views+'/hire_service.html',
                controller: 'MainController'
        })
        

        /* Account functiones */
        .state('profile', {
            url: '/account/',
            views: {
                    '' : { 
                        templateUrl: path_views+'/account.html',
                        controller: 'MainController'
                    },

                    'navigation@profile' : { 
                        templateUrl: path_views+'/templates/account_options.html'
                    }
            }
        })
        .state('orders', {
            url: '/account/orders',
            views: {
                '' : { 
                    templateUrl: path_views+'/account_orders.html',
                    controller: 'MainController'
                },

                'navigation@orders' : { 
                    templateUrl: path_views+'/templates/account_options.html'
                }
            }
            
        })
    	.state('user_services', {
            url: '/account/services',
            views: {
                '' : { 
                    templateUrl: path_views+'/account_services.html',
                    controller: 'MainController'
                },

                'navigation@user_services' : { 
                    templateUrl: path_views+'/templates/account_options.html'
                }
            }
                
        })
        .state('request', {
            url: '/account/requests',
            views: {
                '' : { 
                    templateUrl: path_views+'/account_request.html',
                    controller: 'MainController'
                },

                'navigation@request' : { 
                    templateUrl: path_views+'/templates/account_options.html'
                }
            }
                
        })
        .state('myMessages', {
            url: '/account/messages',
            views: {
                '' : { 
                    templateUrl: path_views+'/account_messages.html',
                    controller: 'MainController'
                },

                'navigation@myMessages' : { 
                    templateUrl: path_views+'/templates/account_options.html'
                }
            }
                
        })

        .state('viewMessage', {
            url: '/account/message/:id',
            views: {
                '' : { 
                    templateUrl: path_views+'/account_viewmessage.html',
                    controller: 'MainController'
                },

                'navigation@myMessages' : { 
                    templateUrl: path_views+'/templates/account_options.html'
                }
            }
                
        })

});