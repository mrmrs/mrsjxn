var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minimist = require('minimist')(process.argv.slice(2)),
    request = require('request'),
    jsonEditor = require('gulp-json-editor');

gulp.task('default', function() {
  console.log('herro!');
  if(minimist) {
    console.log(minimist);
  }
});

gulp.task('image-minify', function () {
    return gulp.src('assets/images/*.jpg')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist'));
});



gulp.task('add', function() {
  var baseUrl = 'http://soundcloud.com/',
      clientID = '1c21814089b72a7cd4ce9246009ddcfb',
      api = 'http://api.soundcloud.com/resolve.json',
      artist,
      track,
      url,
      data;
  if(minimist.track) {
    track = minimist.track;
    if(minimist.artist) {
      artist = minimist.artist;
    } else {
      artist = 'mrsjxn';
    }
    url = api + '?client_id=' + clientID + '&url=' + baseUrl + artist + '/' + track;
    console.log('Getting data for ' + artist + ' - ' + track);
    request(url, function (error, response, body) {
      if(error) console.error(error);
      if (!error && response.statusCode == 200) {
        delete body.user_id;
        var data = JSON.parse(body);
        delete data.commentable; delete data.created_with;
        delete data.state; delete data.original_content_size; delete data.sharing;
        delete data.tag_list; delete data.streamable; delete data.embeddable_by;
        delete data.downloadable; delete data.purchase_url; delete data.label_id;
        delete data.purchase_title; delete data.genre; delete data.label_name;
        delete data.release; delete data.track_type; delete data.key_signature;
        delete data.isrc; delete data.video_url; delete data.bpm; delete data.release_year;
        delete data.release_month; delete data.release_day; delete data.original_format;
        delete data.license; delete data.playback_count;
        delete data.download_count; delete data.favoritings_count; delete data.comment_count;
        return gulp.src('tracks.json')
          .pipe(jsonEditor(function(json) {
            json[artist].unshift(data);
            return json;
          }))
          .pipe(gulp.dest('.'));
      }
    });
  } else {
    console.log('no track provided, use the --track flag');
  }
});

