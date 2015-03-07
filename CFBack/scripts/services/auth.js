/* global app: true */
/* global Firebase: false */
/* exported app */
'use strict';

// The Auth service handles transmitting user data to and from Firebase
app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase) {
	var ref = new Firebase(FIREBASE_URL);	// Access the firebase url
	var auth = $firebaseSimpleLogin(ref);	// Access the firebase login service

	var Auth = {
		register: function (user) {
			return auth.$createUser(user.email, user.password);
		},
		createProfile: function (user) {
			var profile = {
				username: user.username,
				md5_hash: user.md5_hash
			};
			var profileRef = $firebase(ref.child('profile'));
			return profileRef.$set(user.uid, profile);
		},
		login: function (user) {
			return auth.$login('password', user);
		},
		logout: function () {
			auth.$logout();
		},
		resolveUser: function() {
			return auth.$getCurrentUser();
		},
	    signedIn: function() {
	      	return !!Auth.user.provider;
	    },
		user: {}
	};

	// Designate if we're logged in or not
	$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
	  angular.copy(user, Auth.user);
	  Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();

	  console.log(Auth.user);
	  console.log('logged in');
	});

$rootScope.$on('$firebaseSimpleLogin:logout', function() {
	if(Auth.user && Auth.user.profile) {
    	Auth.user.profile.$destroy();
  	}
  	angular.copy({}, Auth.user);
	console.log('logged out');
});

	return Auth;
});