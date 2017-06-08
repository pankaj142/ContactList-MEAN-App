
function myController($scope,$http){
 console.log("hey i am from angular");

//refresh function is to update the data when add Contact button is clicked

var refresh = function(){
    // get request to get contact list from server 
    $http.get('/contactlist').success(function(Response){
        console.log("I got the data I requested.");
        $scope.contactList = Response;
        $scope.contact="";  // 
    });
};
refresh();

$scope.addContact = function(){
    console.log($scope.contact);
    //post request to server to save the contact data to database
    $http.post('/contactlist', $scope.contact).success(function(Response){
        console.log(Response);   
        refresh(); 
    });
};
$scope.remove = function(id){
    console.log(id);
    $http.delete('/contactlist/'+ id).success(function(Response){
        refresh();
    });
};

$scope.edit =function(id){
    console.log(id);
    //get request to server to get the contact data whose edit button in clicked
    $http.get('/contactlist/' +id).success(function(Response){
        $scope.contact =Response;
    });
};

$scope.update = function(){
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(Response){
        refresh();
    });
};

$scope.deselect =function(){
    $scope.contact ="";
};

}