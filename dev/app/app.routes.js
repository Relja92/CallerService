
app.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'pages/home/home.html',
        controller: 'TableFill'
    }).
    when('/call:id', {
        templateUrl: 'pages/call/call.html',
        controller: 'Evaluation'
    }).
    when('/call', {
        templateUrl: 'pages/call/call.html',
        controller: 'Evaluation'
    }).
    otherwise({
        redirectTo:'/home'
    });
    
//    $locationProvider.html5Mode(true);
});

