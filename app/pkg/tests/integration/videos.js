var test = require('tape');
var request = require('request');
var jquerynpm = require('jquery');
jQuery = {};
window = {};

require("jsdom").env("", (err, aWindow) => {
    if (err) {
        console.error(err);
        return;
    }
    window = aWindow;
    jQuery = jquerynpm(window);
    var freeverse = require("../../static/js/fvVideos.js");

    //Test that each video is available
    //Doing a separate test() call for each video to handle async
    test('videos in freeverse videos bucket are available', (t) => {
      t.plan(window.fvVideos.vidSrcs.length);
      window.fvVideos.vidSrcs.forEach((source) => {
        request.head(source, (err, resp, message) => {
          var msg = 'if the status code is 200, ';
          msg += resp.request.uri.path;
          msg += ' is available';

          t.equal(resp.statusCode, 200, msg);
        });
      });
    });
});
