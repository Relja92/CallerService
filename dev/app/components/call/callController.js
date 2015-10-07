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
