/* global app:true */
/* exported app */

'use strict';

app.controller('PostsCtrl', function ($scope, $location, Post, Auth) {
  $scope.posts = Post.all;
  $scope.user = Auth.user;
  $scope.post = {url: 'http://'};

  $scope.deletePost = function (post) {
    Post.delete(post);
  };

});