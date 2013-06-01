'use strict';

var mrsjxn = angular.module('mrsjxn', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/tracklist.html'});
    $routeProvider.when('/:view', {templateUrl: 'partials/tracklist.html'});
    $routeProvider.otherwise({ redirectTo: '/' });
  }]);

// Mrsjxn API account registered under Jxnblk's SoundCloud Account
var clientID = 'bcad0f5473e2f97dbe6b4011c4277ac6';

mrsjxn.factory('soundcloud', function() {
     
    SC.initialize({
      client_id: clientID,
      redirect_uri: 'http:/mrsjxn.com'
    });
    
    return {
      clientID: clientID,
      getTracks:
        function($scope){                
          SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
            $scope.$apply(function () {
              $scope.tracks = data;
              $scope.contentLoading = false;
            });      
          });
        }       
    };
    
  });
  
  
mrsjxn.factory('player', function($rootScope, audio, soundcloud) {
    var player,
        tracks,
        i,
        //paused = false,
        currentTimePercentage = audio.currentTime;
        
    player = {

      tracks: tracks,
      i: i,
      playing: false,
      paused: false,

      play: function(tracks, i) {
        console.log('play: ' + tracks[i].title);
        player.tracks = tracks;
        if (player.paused != tracks[i]) {
          audio.src = tracks[i].stream_url + '?client_id=' + clientID;
        };
        audio.play();
        player.playing = tracks[i];
        player.i = i;
        player.paused = false;
      },

      pause: function(track) {
        console.log('pause: ' + track.title);
        if (player.playing) {
          audio.pause();
          player.playing = false;
          player.paused = track;
        }
      },
      
      stop: function(track) {
        audio.pause();
        player.playing = false;
        player.paused = false;
      },
      
      next: function() {
        player.i = player.i+1;
        if (player.tracks.length > (player.i + 1)) player.play(player.tracks, player.i);   
      }
      
    };
    
    audio.addEventListener('ended', function() {
      $rootScope.$apply(player.next());
    }, false);

    return player;
  });
   
mrsjxn.factory('audio', function($document, $rootScope) {
    var audio = $document[0].createElement('audio');  
    return audio;
  });
  
// Filter to display hours, minutes and seconds  
mrsjxn.filter('playTime', function() {
    return function(ms) {
      var hours = Math.floor(ms / 36e5),
          mins = '0' + Math.floor((ms % 36e5) / 6e4),
          secs = '0' + Math.floor((ms % 6e4) / 1000);
            mins = mins.substr(mins.length - 2);
            secs = secs.substr(secs.length - 2);
      if (hours){
        return hours+':'+mins+':'+secs;  
      } else {
        return mins+':'+secs;  
      }; 
    };
  });
  
// Main Controller  
mrsjxn.controller('MrsjxnCtrl', ['$scope', '$location', '$routeParams', '$anchorScroll', 'soundcloud', 'player', 'audio', function($scope, $location, $routeParams, $anchorScroll, soundcloud, player, audio) {

    $scope.contentLoading = true;
    
    $scope.audio = audio;
    $scope.player = player;
    
    $scope.pageSize = 32;
    $scope.pageOffset = 0;
    $scope.page = 1;
    console.log('controller');
    
    $scope.updatePage = function(){
      $scope.page = ($scope.pageOffset + $scope.pageSize) / $scope.pageSize;
    };
    
    if($routeParams.view){
      $scope.view = $routeParams.view;  
    } else {
      $scope.view = 'mrsjxn';
    };
    
    
    $scope.scget = '/users/' + $scope.view + '/tracks';
    
    soundcloud.getTracks($scope);
    
    $scope.nextPage = function(){
      if($scope.tracks.length >= $scope.pageSize){
        $scope.contentLoading = true;
        $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
        $scope.updatePage();
        soundcloud.getTracks($scope);
        $location.hash();
        $anchorScroll(); 
      };
    };
    
    $scope.prevPage = function(){
      if($scope.pageOffset >= $scope.pageSize) {
        $scope.contentLoading = true;
        $scope.pageOffset = $scope.pageOffset - $scope.pageSize;
        $scope.updatePage();
        soundcloud.getTracks($scope);
        $location.hash();
        $anchorScroll();  
      };      
    };
      
  }]);
  
mrsjxn.controller('ScrubberCtrl', ['$scope', 'audio', function($scope, audio){
      
      function updateScrubber() {
        $scope.$apply(function() {
          $scope.currentBufferPercentage = ((audio.buffered.length && audio.buffered.end(0)) / audio.duration) * 100;
          $scope.currentTimePercentage = (audio.currentTime / audio.duration) * 100;
          $scope.currentTimeMS = (audio.currentTime * 1000).toFixed();
          $scope.durationMS = (audio.duration * 1000).toFixed();
        });
      };
      
      audio.addEventListener('timeupdate', updateScrubber, false);
    
      $scope.seekTo = function($event){
        var xpos = $event.offsetX / $event.target.offsetWidth;
        audio.currentTime = (xpos * audio.duration);
      };
  }]);
  
