/* global app:true */
/* exported app */
'use strict';

// The PostView controller is what lets you view individual posts, and comments
app.controller('PostViewCtrl', function ($scope, $routeParams, Post, Auth) {
	$scope.post = Post.get($routeParams.postId);
	$scope.comments = Post.comments($routeParams.postId);
	$scope.signedIn = Auth.signedIn;
	console.log($scope.signedIn);
	$scope.user = Auth.user;

	$scope.addComment = function () {
		if (!$scope.commentText || $scope.commentText === '') {
			return;
		}

		var comment = {
			text: $scope.commentText,
			creator: $scope.user.profile.username,
			creatorUID: $scope.user.uid
		};
		$scope.comments.$add(comment);

		$scope.commentText = '';
	};

	$scope.deleteComment = function (comment) {
		$scope.comments.$remove(comment);
	};

});