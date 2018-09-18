//定义列表的逻辑控制器
/**
 * angular.module("bookApp").controller("bookListCtrl",function($scope,$http){
	$http.get("data/books.json").success(function(resp){
		$scope.books=resp.data;
	},function(resp){
		$scope.books
	})
  })                                                                                                                            [description]
 */
function bookListCtrl($http,$scope){
	$http.get("data/books.json").then(function(resp){
		$scope.books=resp.data;
	});
	$scope.orderProp="-votes";//默认按投票数的降序排序

	$scope.delBook=function(ev,id){
		ev.preventDefault();
		angular.forEach($scope.books,function(obj,index){
			if(id===obj.id){
				$scope.books.splice(index,1);
			}
		});
	};
}

function bookAddCtrl($scope,$http,bookSer,$location){
	$scope.types=["小说","悬疑","文学","故事"];

	$scope.submitForm=function(){

		bookSer.getBookName().then(function(data){
			$scope.isExited=false;
			if(data.indexOf($scope.bookName)>-1){
				$scope.isExited=true;
			}
			//post的url是一个后台处理数据的地址，但是没有数据库，所以这里即使修改了或者提交表单，也是不会有响应的
			$http.post('backend/actionUrl',function(resp){
				console.log("add successful! And status:"+resp.status);
				$location.path("#!/book/list");//$loccation.path()用于修改当前url的的子路径
				
			},function(resp){
				console.log("add failure! and status:"+resp.status);
				$location.path("#!/book/list");
			});
		});
		
	}
}

function bookEditCtrl($scope,$http,$routeParams,bookSer,$location){
	$http.get('data/books.json').then(function(resp){
		var index=parseInt($routeParams.bookId)-1;
		$scope.book=resp.data[index];

	});
	$scope.types=["小说","悬疑","文学","故事"];
	
	$scope.submitForm=function(){

		bookSer.getBookName().then(function(data){
			$scope.isExited=false;
			if(data.indexOf($scope.book.name)>-1){
				$scope.isExited=true;
			}

			$http.post('backend/actionUrl',function(resp){
				console.log("edit successful! And status:"+resp.status);
				$location.path("#!/book/list");//$loccation.path()用于修改当前url的的子路径
				
			},function(resp){
				console.log("edit failure! and status:"+resp.status);
				$location.path("#!/book/list");
			});
		});
		
	}
	
}

function bookVoteCtrl($scope,$http,$routeParams){
	$http.get('data/books.json').then(function(resp){
		var index=parseInt($routeParams.bookId)-1;
		$scope.book=resp.data[index];
		if($routeParams.bookName)
			console.log("book name:"+$routeParams.bookName);
	});

	//投票
	$scope.voteText="投票";
	$scope.vote=function(){
		$scope.book.votes=$scope.book.votes+1;
		$scope.voteText="已投票";
		$scope.isVoted=true;
	}
}