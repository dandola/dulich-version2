(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', '$state', 'DataUtils', 'Post'];

    function PostController ($scope, $state, DataUtils, Post) {
        var vm = this;

        vm.posts = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();
        
        vm.search = function(){
          if($scope.title!=undefined && $scope.title != ""){
         console.log($scope.title);
            Post.search({
                title: $scope.title
            }, onSuccess, onError);

            function onSuccess(data) {
                // console.log(data);
                vm.posts=data;
                // console.log(vm.sr);
            }

            function onError(error) {
                console.log("data");
            }
          }
          else{
            vm.posts=loadAll();
          }
     }

        function loadAll() {
            Post.query(function(result) {
                vm.posts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
