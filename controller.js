var app = angular.module("myAppModel", []);
app.controller("mainController", function($scope, canvasService, $http){
    $scope.users=[];
    /**
     * get the user information
     */
    $http.get("http://www.mocky.io/v2/59bd9a773c00001303529fe0").success(
        function(resp){
            $scope.users=resp.users;
            /**
             * Set Pictures As Base64 Insead Of Url:
             * This procedure is mandetory because when trying to save the edited image which is a url and
             * not a blob - the error will be: 
             * "Error: Failed to execute 'toBlob' on 'HTMLCanvasElement': Tainted canvases may not be exported."
             * So thid way the problem is solved.
             */
            $scope.users.forEach(function(element) {
                var request = new XMLHttpRequest();
                request.open('GET', element.picture, true);
                request.responseType = 'blob';
                request.onload = function() {
                    var reader = new FileReader();
                    reader.readAsDataURL(request.response);
                    reader.onload =  function(e){
                        element.picture = e.target.result;
                    };
                };
                request.send();
            }, this);
        }
    );
    /**
     * When a user box is clicked the user image pops up somewhere on the canvas 
     * and the user box gets half-transparented.
     * Once the user box get clicked again, the user image is removed from the 
     * canvas, and the user box opacity returns.
     */
    $scope.pictureClick = function(userIndex){
        if($scope.users[userIndex].style==undefined){
            canvasService.setOnCanvas($scope.users[userIndex].picture, Math.random()*700, Math.random()*500, 100, 100, function(img){$scope.users[userIndex].img = img});
            $scope.users[userIndex].style = {opacity:0.5};
        }
        else{
            //$scope.users[userIndex].img.opacity = 0;
            $scope.users[userIndex].img.remove();
            $scope.users[userIndex].style = undefined;
        }
        $scope.$evalAsync(); // causes angular to re-render.
    }

    $scope.save = function(){
        canvasService.save();
    }
});