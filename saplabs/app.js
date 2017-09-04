//Insert code below

console.log("Hello World!");
 var Github=angular.module("Github",[]);

Github.factory("searchRepositories",["$http","$q",function($http,$q){
 	
 	return {
 		getItems:function(param){
 			var defered=$q.defer();
 			var query="";
 			if(param.star)
 			{
 				query+="stars:"+">="+param.starValue;
 			}
 			if(param.lang)
 			{
 				query+="+language:"+param.langValue;
 			}
 			
 			$http.get('https://api.github.com/search/repositories?page='+param.page+'&q='+query)
 			.success(function (data,status, headers, config) {
                
            data.rateLimit=headers('X-RateLimit-Limit');
            data.rateLimitRemaining=headers('X-RateLimit-Remaining');
            defered.resolve(data,headers);
        	})
        	.error(function (error) {
            defered.reject(error);
        	});
        	
        	return defered.promise;
 		}
 	}
 }]);
 
 Github.controller("searchController",["$scope","searchRepositories",function($scope,searchRepositories){
 	//$scope.value="testing";
 	var param={};
     param.star=true;
 	 param.starValue=500;
     param.lang=true;
 	 param.langValue="php";
     param.page=1;
     $scope.test="test";
     $scope.result={};
     var self=this;
     $scope.languages=[
	"perl","java","javascript","php","laravel","go","sql","node","C#","C++","C","python"
];
     $scope.star=500;
     
     var datalist = document.createElement("DATALIST");
        datalist.setAttribute("id", "searches");
        document.getElementById("autocomplete").appendChild(datalist);
     
     for(var i=0;i<$scope.languages.length;i++)
     {
         var option = document.createElement("OPTION");
         option.setAttribute("value",$scope.languages[i]);
         document.getElementById("searches").appendChild(option);
     }

     
     
     GithubCall(param);
     
     
     
     $scope.setParamsStar=function(value){
        $scope.star=value; 
 		param.star=true;
 		param.starValue=value;
 		GithubCall(param);
 	}
 	$scope.setParamsLanguage=function(value){
        $scope.language=value;
 		param.lang=true;
 		param.langValue=value;
 		GithubCall(param);
 	}
    
    //angular.element("#slider").
    var search=angular.element("#search");
    search.on("keypress",function(event){
        $scope.setParamsLanguage(search.val()+event.key);
    });
     
     var slider=angular.element("#slider");
     slider.on("change",function(event){
         $scope.setParamsStar(slider.val());
     });
    
 	function GithubCall(param){
	 	var promise = searchRepositories.getItems(param);
	 	promise.then(function(data){
	 		$scope.result=data;
            $scope.rateLimit=data.rateLimit;
            $scope.rateLimitRemaining=data.rateLimitRemaining;
	 		//console.log(JSON.stringify(data));
	 	},function(error){
	 		console.log("error:"+error);
	 	});
        
 	}
    angular.element("#nxt").on("click",function(event){
        param.page=param.page+1;
        GithubCall(param);
    }); 
 }]);
 