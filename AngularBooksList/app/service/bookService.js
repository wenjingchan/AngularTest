angular.module("bookApp").service("bookSer",function($q,$http){
	this.getBookName=function(){
		return $http.get('data/books.json').then(function(resp){
			if(typeof resp.data==="object"){
				var bookNames=[];
				angular.forEach(resp.data,function(value,index){
					bookNames.push(val.name);
				});
				return bookNames;
			}else{
				return $q.reject(resp.data);
			}
		},function(resp){
			return $q.reject(resp.data);
		});
	}
})