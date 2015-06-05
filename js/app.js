var socket = io();





var vk = angular.module('vk', [
    "ngSanitize",
    "angularSoundManager"
]);

vk.factory('getAudioList', function($http) {

    var audio = {};

    audio.getList = function() {
        return $http({
            method: 'post',
            url: '/get_own_list'
        });
    };

    audio.searchAudio = function(q) {
    	console.log(q);
        return $http({
            method: 'get',
            url: '/search',
            params: {q: q}
        });
    };

    return audio;
});

vk.filter('secondsToDateTime', [function() {
    return function(seconds) {
        var date = new Date(null);
		date.setSeconds(seconds);

		if (date.getUTCHours() != 0) {
			return  date.getUTCHours() + ':' + date.getUTCMinutes() + ':' +  date.getUTCSeconds();
		} else {
			return  date.getUTCMinutes() + ':' +  date.getUTCSeconds();
		}




    };
}]);

vk.controller('VkCtrl', ['$scope', '$sce', 'getAudioList',
    function($scope, $sce, getAudioList) {



    	$scope.playlist = [];

	    getAudioList.getList().success(function(response) {
	        $scope.audios = response;
	    });

	    socket.on('add to playlist', function(audio){

	    	if ($scope.getById($scope.playlist, audio.id) === undefined) {
	    		$scope.playlist.push(audio);
	    		$scope.$apply();
	    	}
	    });

		$scope.addToPlaylist = function(audio) {
			socket.emit('add to playlist', audio);
		};

		$scope.search = function() {
			getAudioList.searchAudio($scope.query).success(function(response) {
		        $scope.audios = response;
		    });
		};



		$scope.getById = function(arr, id) {
		    for (var d = 0, len = arr.length; d < len; d += 1) {
		        if (arr[d].id === id) {
		            return arr[d];
		        }
		    }
		};

}]);



