var test = require('tape');
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

    //The video module tested in this document
    //is not stateless, so we'll initialize
    //the fvVideos module
    window.fvVideos.videos = jQuery.parseHTML(`
      <video id="video1">
        <source>
      </video>
      <video id="video2" class="hidden">
        <source>
      </video>
    `);

    test('video pauseHidden test', (t) => {
      t.plan(2);
      var videos = jQuery.parseHTML(`
        <video id="video1">
          <source>
        </video>
        <video id="video2" class="hidden">
          <source>
        </video>
      `);

      var msg = "A video element w/o the 'hidden' class should not be paused";
      var mockEO = {target: videos[0]};
      window.fvVideos.pauseHidden(mockEO);
      t.false(mockEO.target.paused, msg);
      
      var msg = "A video element with the 'hidden' class should be paused";
      var mockEO = {target: videos[1]};
      window.fvVideos.pauseHidden(mockEO);
      t.true(mockEO.target.paused, msg);
    });

    test('video nextVideo test', (t) => {
      t.plan(window.fvVideos.vidSrcs.length - 1);

      var msg = "nextVideo should return the next URL in fvVideos.vidSrcs";
      for(var i = 2; i <= window.fvVideos.vidSrcs.length - 1; i++) {
        t.equal(window.fvVideos.nextVideo(), window.fvVideos.vidSrcs[i], msg);
      }

      var msg = "nextVideo should cycle back to the beginning after returning the last URL";
      t.equal(window.fvVideos.nextVideo(), window.fvVideos.vidSrcs[0], msg);
      
    });

    test('video getOtherVideo test', (t) => {
      t.plan(2);
      var aVideo = window.fvVideos.videos[0];
      var otherVideo = window.fvVideos.videos[1];

      var msg = "getOtherVideo should get the other video in window.fvVideos.videos";
      t.deepEqual(window.fvVideos.getOtherVideo(aVideo), otherVideo, msg);
      t.deepEqual(window.fvVideos.getOtherVideo(otherVideo), aVideo, msg);
    });

    test('video playVideo test', (t) => {
      t.plan(2);
      var aVideo = jQuery.parseHTML(`
        <video class="hidden">
          <source>
        </video>
      `.trim())[0];


      window.fvVideos.playVideo(aVideo);
      var msg = "playVideo should remove the hidden class from the video element";
      t.equal(aVideo.className, '', msg);

      //jsdom doesn't support the play method, so we mock it
      function FakeVideo() {
        this.paused = true;
        this.play = function() { this.paused = false; }
      }
      var anotherVideo = new FakeVideo();
      
      window.fvVideos.playVideo(anotherVideo);
      var msg = "playVideo should play the video, so it shouldn't be paused";
      t.false(anotherVideo.paused, msg);
    });

    test('video hideVideo test', (t) => {
      t.plan(3);
      var aVideo = jQuery.parseHTML(`
        <video class="hidden">
          <source src="nothing">
        </video>
      `.trim())[0];
      var originalSrc = aVideo.src;

      window.fvVideos.hideVideo(aVideo);
      var msg = "hideVideo should add the hidden class to the video element";
      t.equal(aVideo.className, 'hidden', msg);
      
      var msg = "hideVideo should update the src attribute of the video element";
      t.notEqual(originalSrc, aVideo.src, msg);

      var msg = "hideVideo should use a source from fvVideos.vidSrcs";
      t.notEqual(window.fvVideos.vidSrcs.indexOf(aVideo.src), -1, msg);
    });
});
