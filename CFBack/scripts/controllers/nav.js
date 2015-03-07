/* global app:true */
/* exported app */
'use strict';

// The Nav controller is a prototype for the 'new post' function.
app.controller('NavCtrl', function ($scope, $location, Post, Auth) {
  $scope.post = {url: 'http://', title: ''};
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
  $scope.user = Auth.user;

// This is the actual posting function!
  $scope.submitPost = function () {
  	$scope.post.creator = $scope.user.profile.username;
  	$scope.post.creatorUID = $scope.user.uid;
    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };

});