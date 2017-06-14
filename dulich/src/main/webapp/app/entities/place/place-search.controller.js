(function() {
    'use strict';

    angular
    .module('dulichApp')
    .controller('PlaceSearchController', PlaceSearchController);

    PlaceSearchController.$inject = ['$scope', '$state', 'postsearch', 'postsview','Post', 'postnew'];

    function PlaceSearchController ($scope, $state, postsearch, postsview, Post, postnew) {
        var vm = this;
        // vm.entity = entity;
        vm.sr= [];
        // vm.sr = Post.search({title : a});
        vm.postsview=postsview;
        // vm.places=places;
        // vm.posts = posts;
        // vm.tours = tours;
        // vm.hotels = hotels;
        // -- pagination -->
        vm.sr= postsearch;
        // vm.postnew = postnew;
       // -- pagination -->
        vm.mid=1;
        vm.currentPage=1; //trang hiện tại là 1
        vm.datas=[]; //dữ liệu cần in
        vm.pageSize=4; // số trang trong một trang web
        vm.msize=vm.sr.length; // tổng số bài posts
        vm.numpage= Math.ceil(vm.msize/vm.pageSize); // số lượng number page.
        vm.arr=[];
        for(var i=1;i<= vm.numpage; i++){
            vm.arr.push(i);
        }
        // <!-- //pagination-->

        $scope.checked=true;

        $scope.color1="orange";
        $scope.color2="none";


        $scope.disable1=function(){
            $scope.checked=true;
            $scope.color1="orange";
            $scope.color2="none";
        }
        $scope.disable2=function(){
            $scope.checked=false;
            $scope.color1="none";
            $scope.color2="orange";
        }

        vm.search = function(){
          if($scope.title!=undefined && $scope.title != ""){
         console.log($scope.title);
            Post.search({
                title: $scope.title
            }, onSuccess, onError);

            function onSuccess(data) {
                // console.log(data);
                vm.sr=data;
                // console.log(vm.sr);
            }

            function onError(error) {
                console.log("data");
            }
          }
          else{
            vm.sr=postsview;
          }
     }
    
      $scope.onchange= function(){
        if(vm.currentPage >= vm.numpage && vm.mid==1){
            console.log('false');
            return;
        }
        else if(vm.currentPage==1 && vm.mid==-1){
            console.log('false');
            return;
        }
        else {
                vm.currentPage = vm.currentPage + vm.mid;
            }
    }


    $scope.$watch("vm.currentPage + vm.pageSize",function(){
      
      var begin=(vm.currentPage-1)*vm.pageSize,
      end=begin + vm.pageSize;
      vm.datas=vm.sr.slice(begin,end);
      console.log(vm.datas);
  });
  // /pagination
}
})();
