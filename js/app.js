var socket = io();
var notice = false;

var vk = angular.module('vk', [
    "ngSanitize",
    "angularSoundManager",
    // "angular-sortable-view"
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

vk.filter('secTime', function () {
    return function (input) {
        function pad(d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        }

        var min = (input / 60) << 0,
            sec = Math.round((input % 60));

        return pad(min) + ':' + pad(sec);
    };
});

vk.controller('VkCtrl', ['$scope', '$sce', 'getAudioList', 'angularPlayer',
    function($scope, $sce, getAudioList, angularPlayer) {

    	getAudioList.getList().success(function(response) {
    	    $scope.audios = response;
    	});

    	$scope.$on('track:id', function(event, data) {
    		socket.emit('set current', data);
        });

    	soundManager.setup({
    	    onready: function() {
    		  	if (playlist.length) {
    		  		angular.forEach(playlist, function(audio, key) {
    		  			if ($scope.getById(angularPlayer.getPlaylist(), audio.id) === undefined) {
					  		angularPlayer.addTrack(audio);
					  	}
					});
    		  	}
    	    },
    	});

	    socket.on('add to playlist', function(audio){
	    	if ($scope.getById(angularPlayer.getPlaylist(), audio.id) === undefined) {
	    		angularPlayer.addTrack(audio);
	    	}
	    	
	    });

	    socket.on('remove from playlist', function(audio, index){
	    	angularPlayer.removeSong(audio.id, index);
	    });

	    socket.on('set current', function(audio_id){
	    	var audio = angularPlayer.currentTrackData();
            $scope.$apply(function() {
                $scope.current = audio_id;
                if (notice == false) {
                	// notifyMe(audio);
                }
            });
	    });


		$scope.addToPlaylist = function(audio) {
			if ($scope.getById(angularPlayer.getPlaylist(), audio.id) === undefined) {
				socket.emit('add to playlist', audio);
			}
		};
		$scope.removeFromPlaylist = function(audio, index) {
			socket.emit('remove from playlist', audio, index);
		};



		$scope.search = function() {
			getAudioList.searchAudio($scope.query).success(function(response) {
		        $scope.audios = response;
		    });
		};

		$scope.showMy = function() {
			getAudioList.getList().success(function(response) {
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




function notifyMe(audio) {
	notice = true;
  	Notification.requestPermission(function(permission){
		var notification = new Notification(audio.title,{body:audio.artist,icon:'site/logo.png',dir:'auto'});
		setTimeout(function(){
			notification.close();
			notice = false;
		},2000);
	});
}