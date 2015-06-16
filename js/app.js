var socket = io();
var notice = false;

var vk = angular.module('vk', [
    "ngSanitize",
    "angularSoundManager",
    "ngDialog",
    "ui.sortable"
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
        return $http({
            method: 'get',
            url: '/search',
            params: {q: q}
        });
    };

    audio.getLirics = function(lyrics_id) {
        return $http({
            method: 'get',
            url: '/get_lirics',
            params: {lyrics_id: lyrics_id}
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


vk.directive('playlistScroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).mCustomScrollbar({
                theme:"minimal"
            });

            socket.on('set current', function(audio_id){
                $(element).mCustomScrollbar('scrollTo',
                    $(element).find('li.active')
                );
            });
        }
    };
});


vk.controller('VkCtrl', ['$scope', '$sce', 'getAudioList', 'angularPlayer', 'ngDialog', '$timeout', '$rootScope',
    function($scope, $sce, getAudioList, angularPlayer, ngDialog, $timeout, $rootScope) {

        $scope.user = user;

        $scope.mainPlaylist = [];

        // $scope.sortableOptions = {
        //     // stop: function(e, ui) {
        //     //     var j = 0;
        //     //     // this callback has the changed model
        //     //     var logEntry = $scope.playlist.map(function(i) {
        //     //         return {
        //     //             id: i.id,
        //     //             position: j++
        //     //         };
        //     //     });

        //     //     // socket.emit('sort', logEntry, $scope.playlist);
        //     // }
        //     start: function(event, ui) {
        //         console.log("Start position: " + ui.item.index());
        //     },
        //     stop: function(event, ui) {
        //         console.log("New position: " + ui.item.index());
        //     }
        // };

    	getAudioList.getList().success(function(response) {
    	    $scope.audios = response;
    	});

    	$scope.$on('track:id', function(event, data) {

            $timeout(function() {
                var trackId = angularPlayer.getCurrentTrack();
                var currentKey = angularPlayer.isInArray($scope.mainPlaylist, trackId);
                    $scope.currentMyPlaying = $scope.mainPlaylist[currentKey];

                socket.emit('set current', data);
            }, 0);

        });

    	soundManager.setup({
    	    onready: function() {
                if (playlist.length) {

                    $scope.mainPlaylist = playlist;

                    angular.forEach(playlist, function(audio, key) {

                        soundManager.createSound({
                            id: audio.id,
                            url: audio.url
                        });

                        if (audio.current) {
                            angularPlayer.initPlayTrack(audio.id);
                        }
                    });
                }
    	    },
    	});

	    socket.on('add to playlist', function(audio){
	    	if ($scope.getById($scope.mainPlaylist, audio.id) === undefined) {
	    		soundManager.createSound({
                    id: audio.id,
                    url: audio.url
                });

                $scope.$apply(function() {
                    $scope.mainPlaylist.push(audio);
                });
	    	}
	    });

	    socket.on('remove from playlist', function(audio, index) {
            var trackId = angularPlayer.getCurrentTrack();

            if(audio.id === trackId) {
                angularPlayer.nextTrack();
            }

            soundManager.destroySound(audio.id);

            $scope.$apply(function() {
                $scope.mainPlaylist.splice(index, 1);
            });
        });

        socket.on('delete old', function(audios, index){
            angular.forEach(audios, function(audio, key) {
	    	  angularPlayer.removeSong(audio.audio_id, index);
            });
	    });

        socket.on('set current', function(audio_id){
            var audio = angularPlayer.currentTrackData();
            $scope.$apply(function() {
                $scope.current = audio_id;
                if (notice === false) {
                    notifyMe(audio);
                }
            });
        });

	    socket.on('shuffle', function(currentIndex, shuffledArray){

            for (var i = $scope.mainPlaylist.length - 1; i >= 0; i--) {

                audio = $scope.mainPlaylist[i];

                if (i > currentIndex + 1) {
                    soundManager.destroySound(audio.id);
                    $scope.mainPlaylist.splice(i, 1);
                }
            }

	    	angular.forEach(shuffledArray, function(audio, key) {

                soundManager.createSound({
                    id: audio.id,
                    url: audio.url
                });

                $scope.mainPlaylist.push(audio);
            });
	    });

        $scope.play = function(audio) {

            if ($scope.currentMyPlaying && $scope.currentMyPlaying.id === audio.id) {
                angularPlayer.play();
            } else {
                angularPlayer.playTrack(audio.id);
            }
        };

		$scope.addToPlaylist = function(audio) {
			if ($scope.getById($scope.mainPlaylist, audio.id) === undefined) {
				socket.emit('add to playlist', audio, $scope.user);
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

        function shuffle(array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        $scope.shaffleNew = function() {
            // shuffle($scope.mainPlaylist);
            // shuffle($scope.mainPlaylist);

            var currentIndex = $scope.getIndexById($scope.mainPlaylist, $scope.currentMyPlaying.id);

            var tempArr = [],
                audio = null;

            for (var i = $scope.mainPlaylist.length - 1; i >= 0; i--) {

                audio = $scope.mainPlaylist[i];

                if (i > currentIndex + 1) {
                    tempArr.push(audio);
                }
            }

            var shuffledArray = shuffle(tempArr);

            socket.emit('shuffle', currentIndex, shuffledArray);
        };

		$scope.getLirics = function(lyrics_id) {

			getAudioList.getLirics(lyrics_id).success(function(response) {
	    	    ngDialog.open({
                    template: 'externalTemplate',
                    data: {
                        text: response
                    }
                });
	    	});
		};

		$scope.getById = function(arr, id) {
		    for (var d = 0, len = arr.length; d < len; d += 1) {
		        if (arr[d].id === id) {
		            return arr[d];
		        }
		    }
		};

        $scope.getIndexById = function(arr, id) {
            for (var d = 0, len = arr.length; d < len; d += 1) {
                if (arr[d].id === id) {
                    return d;
                }
            }
        };

}]);


vk.controller('VkClientCtrl', ['$scope', '$rootScope', '$sce', 'getAudioList', 'angularPlayer', '$timeout', 'ngDialog',
    function($scope, $rootScope, $sce, getAudioList, angularPlayer, $timeout, ngDialog) {

        $scope.user = user;

        $scope.mainPlaylist = [];
        $scope.myPlaylist = [];

        $scope.currentPlaylist = null;

        $scope.searchDelay = false;

        soundManager.setup({
            onready: function() {

                getAudioList.getList().success(function(response) {
                    $scope.refreshPlayList(response);

                    if (playlist.length) {

                        $scope.mainPlaylist = playlist;

                        angular.forEach(playlist, function(audio, key) {

                            if (audio.current) {
                                $scope.current = audio.id;

                                if (notice === false) {
                                    $timeout(function(){
                                        notifyMe(audio);
                                    }, 4000);
                                }
                            }
                        });
                    }
                });
            },
        });


        socket.on('sort', function(data, playlist){
            // var res = [];

            // for (var i = data.length - 1; i >= 0; i--) {
            //     res[data[i].id] = data[i].position;
            // }

            // for (var j = $scope.mainPlaylist.length - 1; j >= 0; j--) {
            //     res[data[i].id] = data[i].position;
            // }

            $scope.$apply(function() {
                $scope.mainPlaylist = playlist;
            });

        });


        socket.on('add to playlist', function(audio){
            if ($scope.getById($scope.mainPlaylist, audio.id) === undefined) {

                if ($scope.currentPlaylist === 'mainPlaylist') {
                    soundManager.createSound({
                        id: audio.id,
                        url: audio.url
                    });
                }

                $scope.$apply(function() {
                    $scope.mainPlaylist.push(audio);
                });
            }
        });

        socket.on('remove from playlist', function(audio, index){

            // var trackId = angularPlayer.getCurrentTrack();

            // if(audio.id === trackId) {
            //     angularPlayer.nextTrack();
            // }

            soundManager.destroySound(audio.id);

            $scope.$apply(function() {
                $scope.mainPlaylist.splice(index, 1);
            });
        });

        socket.on('delete old', function(audios, index){
            angular.forEach(audios, function(audio, key) {
              angularPlayer.removeSong(audio.audio_id, index);
            });
        });

        socket.on('set current', function(audio_id){
            var audio = $scope.getById($scope.mainPlaylist, audio_id);

            $scope.$apply(function() {
                $scope.current = audio_id;
                if (notice === false) {
                    notifyMe(audio);
                }
            });
        });

        socket.on('shuffle', function(currentIndex, shuffledArray) {

            for (var i = $scope.mainPlaylist.length - 1; i >= 0; i--) {

                audio = $scope.mainPlaylist[i];

                if (i > currentIndex + 1) {

                    if ($scope.currentPlaylist === 'mainPlaylist') {
                        soundManager.destroySound(audio.id);
                    }

                    $scope.$apply(function() {
                        $scope.mainPlaylist.splice(i, 1);
                    });

                }
            }

            angular.forEach(shuffledArray, function(audio, key) {

                if ($scope.currentPlaylist === 'mainPlaylist') {
                    soundManager.createSound({
                        id: audio.id,
                        url: audio.url
                    });
                }

                $scope.$apply(function() {
                    $scope.mainPlaylist.push(audio);
                });
            });

            if ($scope.currentPlaylist === 'mainPlaylist') {
                angularPlayer.stop();
            }
        });



        $scope.play = function(audio, playlist) {

            if ($scope.currentPlaylist !== playlist) {
                $scope.currentPlaylist = playlist;

                angularPlayer.clearPlaylist(function() {
                    var response = $scope[playlist];

                    for(var i = 0; i < response.length; i++) {
                        soundManager.createSound({
                            id: response[i].id,
                            url: response[i].url
                        });
                    }
                    angularPlayer.playTrack(audio.id);
                });
            } else {

                if ($scope.currentMyPlaying.id === audio.id) {
                    angularPlayer.play();
                } else {
                    angularPlayer.playTrack(audio.id);
                }

            }
        };


        $scope.addToPlaylist = function(audio) {
            if ($scope.getById($scope.mainPlaylist, audio.id) === undefined) {
                socket.emit('add to playlist', audio, $scope.user);
            }
        };
        $scope.removeFromPlaylist = function(audio, index) {
            socket.emit('remove from playlist', audio, index);
        };

        $scope.$on('track:id', function(event, data) {

            $timeout(function() {
                var trackId = angularPlayer.getCurrentTrack();
                var currentKey = angularPlayer.isInArray($scope.myPlaylist, trackId);

                if (currentKey !== false) {
                    $scope.currentMyPlaying = $scope.myPlaylist[currentKey];
                } else {
                    currentKey = angularPlayer.isInArray($scope.mainPlaylist, trackId);
                    $scope.currentMyPlaying = $scope.mainPlaylist[currentKey];
                }
            }, 0);



        });



        $scope.search = function() {

            if($scope.searchDelay){
                $timeout.cancel($scope.searchDelay);
            }
            $scope.searchDelay = $timeout(function(){
                getAudioList.searchAudio($scope.query).success(function(response) {
                    $scope.refreshPlayList(response);
                });
            }, 1000);
        };

        $scope.showMy = function() {
            getAudioList.getList().success(function(response) {
                $scope.refreshPlayList(response);
            });
        };

        $scope.refreshPlayList = function(response) {
            $scope.myPlaylist = [];
            $scope.addToList(response);
        };

        $scope.addToList = function(response) {
            for(var i = 0; i < response.length; i++) {
                var inArrayKey = angularPlayer.isInArray( $scope.myPlaylist, response[i].id);
                if(inArrayKey === false) {
                    $scope.myPlaylist.push(response[i]);
                }
            }
        };

        $scope.getLirics = function(lyrics_id) {

            getAudioList.getLirics(lyrics_id).success(function(response) {
                ngDialog.open({
                    template: 'externalTemplate',
                    data: {
                        text: response
                    }
                });
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
		var notification = new Notification(audio.artist + ' ' + audio.title,{body: audio.fio,icon:'site/logo.png',dir:'auto'});
		setTimeout(function(){
			notification.close();
			notice = false;
		},5000);
	});
}
