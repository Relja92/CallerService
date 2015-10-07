
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
