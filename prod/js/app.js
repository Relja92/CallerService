var app = angular.module('app',['ngRoute','angularUtils.directives.dirPagination','ui.bootstrap']);

app.controller('Evaluation', function($scope,$modal) {

$scope.close = function() {
    close();
};
    
$scope.open = function (size) {
     modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'Evaluation',
      size: 'lg',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    }); 
}

$scope.hideModal = function () {
    modalInstance.close();
};
    
    
//$scope.logovanje = function(){
//    console.log('dasdasdasdasdasd');
//};
    
$scope.updateSelectionManager = function(position, managerScoreBox) {
    $scope.selectedManagerScore=$scope.managerScoreBox[position].name;
    angular.forEach(managerScoreBox, function(subscription, index) {
      if (position != index) 
        subscription.checked = false;
    });
}

$scope.submitImprovement = function(value) {
    selectedImprovement=value;
    console.log(selectedImprovement);
}

$scope.submitTextArea = function(value) {
    selectedTextArea=value;
}

$scope.updateSelectionCustomer = function(position, customerScoreBox) {
    $scope.selectedCustomerScore=$scope.customerScoreBox[position].name;
    angular.forEach(customerScoreBox, function(subscription, index) {
    if (position != index) 
        subscription.checked = false;
    });
}

$scope.save = function() {
    console.log(typeof $scope.selectedCustomerScore);
    console.log(typeof $scope.selectedManagerScore);
    console.log(typeof $scope.selectedImprovement);
    console.log(selectedTextArea.length);

    if(typeof $scope.selectedCustomerScore === 'undefined'|| typeof $scope.selectedManagerScore === 'undefined' || typeof selectedImprovement == 'undefined' ||  selectedTextArea.length === 0){
        $scope.open();
    }else{
        for(var i=0;i<itemsLength;i++){
            if(callId==$scope.items[i].callId){
                $scope.items[i].evaluation.customerScore=$scope.selectedCustomerScore;
                $scope.items[i].evaluation.managerScore=$scope.selectedManagerScore;
                $scope.items[i].evaluation.totalScore=($scope.selectedCustomerScore+$scope.selectedManagerScore)/2;
                $scope.items[i].evaluation.improvement=selectedImprovement;
                $scope.items[i].evaluation.resume=selectedTextArea;
            }
        }
        obj=JSON.stringify($scope.items);
        localStorage.setItem('obj',obj);
        location.assign("#/home");


    }

}

$scope.cancel = function() {
    location.assign("#/home");
}

$scope.playCall = function(){
    document.getElementById("audio").src=$scope.audioFile;
    document.getElementById("audio").play();
}

$scope.pauseCall = function(){
    document.getElementById("audio").pause();
}


items = localStorage.getItem('obj');
$scope.items=JSON.parse(items);
callId=localStorage.getItem('callID')
itemsLength=$scope.items.length;
for(i=0;i<itemsLength;i++){
    if(callId==$scope.items[i].callId){
        $scope.selectedCustomerScore=$scope.items[i].evaluation.customerScore;
        $scope.selectedManagerScore=$scope.items[i].evaluation.managerScore;
        $scope.textForTextArea=$scope.items[i].evaluation.resume;
        $scope.audioFile=$scope.items[i].callMedias.audioFile;
        $scope.selectedImprovement=$scope.items[i].evaluation.improvement;
    }
}
  $scope.customerScoreBox = [{
      name: 1,
      checked: false
    }, {
      name: 2,
      checked: false
    }, {
      name: 3,
      checked: false
    }, {
      name: 4,
      checked: false
    }, {
      name: 5,
      checked: false
    }, {
      name: 6,
      checked: false
    }, {
      name: 7,
      checked: false
    }, {
      name: 8,
      checked: false
    }, {
      name: 9,
      checked: false
    }, {
      name: 10,
      checked: false
    }, 
  ]


  for(i=0;i<10;i++){
    if($scope.customerScoreBox[i].name==$scope.selectedCustomerScore){
      $scope.customerScoreBox[i].checked=true;
    }
  }


  $scope.managerScoreBox = [{
      name: 1,
      checked: false
    }, {
      name: 2,
      checked: false
    }, {
      name: 3,
      checked: false
    }, {
      name: 4,
      checked: false
    }, {
      name: 5,
      checked: false
    }, {
      name: 6,
      checked: false
    }, {
      name: 7,
      checked: false
    }, {
      name: 8,
      checked: false
    }, {
      name: 9,
      checked: false
    }, {
      name: 10,
      checked: false
    }, 
  ]
  for(i=0;i<10;i++){
    if($scope.managerScoreBox[i].name==$scope.selectedManagerScore){
      $scope.managerScoreBox[i].checked=true;
    }
  }


    $scope.improvements = [{
          description: "Soft skills - communication",
        }, {
          description: "Hard skills - products",
        }, {
          description: "Call technique",
        }
    ]

    for(var i=0;i<3;i++){
        if($scope.improvements[i].description==$scope.selectedImprovement){
            $scope.selectedImprovement=({val:$scope.improvements[i].description});

        }
    }
    });


app.controller("TableFill", function($scope) {
    
$scope.evaluate = function() {
    localStorage.setItem('callID',this.neededItem.callId);
    var locationHref = '#/call'+this.neededItem.callId;
    location.assign(locationHref);
};


$scope.playCall = function(){
    document.getElementById("audio").src=this.neededItem.audio;
    document.getElementById("audio").play();
}

$scope.pauseCall = function(){
    document.getElementById("audio").pause();
}

$scope.showAllCalls = function(){
    $scope.neededItems=$scope.allItems;
}

$scope.showLastWeekCalls = function(){
    $scope.neededItems=$scope.weeklyItems;
}
    
    $scope.items = localStorage.getItem('obj');
    $scope.items=JSON.parse($scope.items);
    $scope.totalItems = $scope.items.length;

    $scope.neededItems = [];
    $scope.weeklyItems = [];
    $scope.allItems = [];

    var lenghtOfItems = $scope.items.length;
    var currentTime = moment().format('YYYY-MM-DD').toString();;
    console.log(currentTime);
    
    for(var i =0;i<lenghtOfItems;i++){    
        $scope.formatedDate=$scope.items[i].callStart.slice(0,10);
        
//        Calculate date difference
        $scope.date1 = new Date($scope.formatedDate);
        $scope.date2 = new Date(currentTime);
        $scope.timeDiff = Math.abs($scope.date2.getTime() - $scope.date1.getTime());
        $scope.diffDays = Math.ceil($scope.timeDiff / (1000 * 3600 * 24)); 
        var objDate = new Date();
        var hours = objDate.getHours();
        if(hours >= 12 && hours < 24){
            $scope.diffDays= $scope.diffDays+1;
        }
        
        $scope.formatedDate = $scope.formatedDate.replace(/-/g, '');
        $scope.formatedDate=moment($scope.formatedDate, "YYYYMMDD").fromNow();   
        
        
        
        $scope.callHours = parseInt($scope.items[i].callStart.slice(10,13));
        $scope.callMinutes = parseInt($scope.items[i].callStart.slice(14,17));
        $scope.callSeconds = parseInt($scope.items[i].callStart.slice(17,21));
        $scope.endHours = parseInt($scope.items[i].callEnd.slice(10,13));
        $scope.endMinutes = parseInt($scope.items[i].callEnd.slice(14,17));
        $scope.endSeconds = parseInt($scope.items[i].callEnd.slice(17,21));
        
        var spentHours=$scope.endHours-$scope.callHours;
        if($scope.endMinutes<$scope.callMinutes){
            spentHours--;
            var spentMinutes=60+$scope.endMinutes-$scope.callMinutes;
        }else{
            var spentMinutes=$scope.endMinutes-$scope.callMinutes
        }
        if($scope.endSeconds< $scope.callSeconds){
            spentMinutes--;
            var spentSeconds=60+$scope.endSeconds- $scope.callSeconds;
        }else{
            var spentSeconds=$scope.endSeconds- $scope.callSeconds;
        }
        
        $scope.duration =""+spentHours+"h : "+spentMinutes+"min : "+spentSeconds+"sec";
        $scope.durationInMinutes = spentHours*60 + spentMinutes;
        
        neededItem={
            "callId": $scope.items[i].callId,
            "callType": $scope.items[i].callType,
            "callDirection": $scope.items[i].callDirection,
            "when":$scope.formatedDate,
            "durationInDays":$scope.diffDays,
            "agentId": $scope.items[i].agent.agentId,
            "clientId": $scope.items[i].client.clientId,
            "duration": $scope.duration,
            "evaluation":($scope.items[i].evaluation.customerScore+$scope.items[i].evaluation.managerScore)/2,
            "improvement":$scope.items[i].evaluation.improvement,
            "durationInMinutes":$scope.durationInMinutes,
            "audio":$scope.items[i].callMedias.audioFile
        }
        
         $scope.allItems.push(neededItem);
        
        if($scope.diffDays<8){
            $scope.weeklyItems.push(neededItem);
        }        
    }

    $scope.neededItems=$scope.weeklyItems;

     
});


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

