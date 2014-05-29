'use strict';

var mrsjxn = angular.module('mrsjxn', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html'});
    $routeProvider.when('/:view', {templateUrl: 'partials/main.html'});
    $routeProvider.otherwise({ redirectTo: '/' });
  }]);

// Mrsjxn API account registered under Jxnblk's SoundCloud Account
var clientID = 'bcad0f5473e2f97dbe6b4011c4277ac6',
    iconUrl = '/assets/icons/plangular-icons.svg';

mrsjxn.factory('player', function ($document, $rootScope, $http) {
  // Define the audio engine
  var audio = $document[0].createElement('audio');

  // Define the player object
  var player = {
    track: false,
    playing: false,
    paused: false,
    tracks: null,
    i: null,
    play: function(tracks, i) {
      if (i == null) {
        tracks = new Array(tracks);
        i = 0;
      };
      player.tracks = tracks;
      player.track = tracks[i];
      player.i = i;
      if (player.paused != player.track) audio.src = player.track.stream_url + '?client_id=' + clientID;
      audio.play();
      player.playing = player.track;
      player.paused = false;
    },
    pause: function() {
      audio.pause();
      if (player.playing) {
        player.paused = player.playing;
        player.playing = false;
      };
    },
    // Functions for playlists (i.e. sets)
    playPlaylist: function(playlist) {
      if (player.tracks == playlist.tracks && player.paused) player.play(player.tracks, player.i);
      else player.play(playlist.tracks, 0);
    },
    next: function(playlist) {
      if (!playlist){
        if (player.i+1 < player.tracks.length) {
          player.i++;
          player.play(player.tracks, player.i);
        } else {
          player.pause();
        };
      } else if (playlist && playlist.tracks == player.tracks) {
        if (player.i + 1 < player.tracks.length) {
          player.i++;
          player.play(playlist.tracks, player.i);
        } else {
          player.pause();
        };
      };
    },
    previous: function(playlist) {
      if (playlist.tracks == player.tracks && player.i > 0) {
        player.i = player.i - 1;
        player.play(playlist.tracks, player.i);
      };
    }
  };

  audio.addEventListener('ended', function() {
    $rootScope.$apply(function(){
      if (player.tracks.length > 0) player.next();
      else player.pause();
    });
    
  }, false);

  return player;

  // Returns the player, audio, track, and other objects
  /*
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      scope.player = player;
      scope.audio = audio;
      scope.currentTime = 0;
      scope.duration = 0;

      // Updates the currentTime and duration for the audio
      audio.addEventListener('timeupdate', function() {
        if (scope.track == player.track || (scope.playlist && scope.playlist.tracks == player.tracks)){
          scope.$apply(function() {
            scope.currentTime = (audio.currentTime * 1000).toFixed();
            scope.duration = (audio.duration * 1000).toFixed();
          });  
        };
      }, false);

      // Handle click events for seeking
      scope.seekTo = function($event){
        var xpos = $event.offsetX / $event.target.offsetWidth;
        audio.currentTime = (xpos * audio.duration);
      };
    }
  }
  */
});

// Plangular Icons
/*
mrsjxn.directive('icon', function() {
  var xmlHttp = null,
      sprite = {
        play: '',
        pause: '',
        previous: '',
        next: ''
      };
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      if (!sprite) return false;
      var el = elem[0],
          id = attrs.icon,
          //svg = sprite.getElementById(id).cloneNode(true);
          svg = document.createElement(svg);
          //svg;
      //svg.createElement(path);
      el.className += ' icon icon-' + id;
      svg.removeAttribute('id');
      svg.setAttribute('class', el.className);
      el.parentNode.replaceChild(svg, el);
    }
  }
});
*/

// Filter to convert milliseconds to hours, minutes, seconds
mrsjxn.filter('playTime', function() {
  return function(ms) {
    var hours = Math.floor(ms / 36e5),
        mins = '0' + Math.floor((ms % 36e5) / 6e4),
        secs = '0' + Math.floor((ms % 6e4) / 1000);
        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
    if(!isNaN(secs)){
      if (hours){
        return hours+':'+mins+':'+secs;  
      } else {
        return mins+':'+secs;  
      };
    } else {
      return '00:00';
    };
  };
});


// Main Controller
mrsjxn.controller('MainCtrl', ['$scope', '$location', '$http', 'player', function($scope, $location, $http, player) {
    
    $scope.contentLoading = true;
    $scope.tracks = [];
    $scope.views = ['mr_mrs', 'mrsjxn', 'jxnblk'];
    $scope.viewIndex = 1;
    $scope.view = $scope.views[$scope.viewIndex];

    $scope.player = player;
    

    $http.get('/tracks.json').success(function(data){
      console.log(data);
      //$scope.tracks = data.mrsjxn;
    });
    
    
    $scope.changeView = function(i) {
      $scope.contentLoading = true;
      $scope.viewIndex = i;
      $scope.view = $scope.views[$scope.viewIndex];
    };
    
    $scope.viewLeft = function() {
      if ($scope.viewIndex > 0) {
        $scope.viewIndex--;
        $scope.changeView($scope.viewIndex);
      };
    };
    
    $scope.viewRight = function() {
      if ($scope.viewIndex < 2) {
        $scope.viewIndex++;
        $scope.changeView($scope.viewIndex);
      };
    };
      
  }]);

  
