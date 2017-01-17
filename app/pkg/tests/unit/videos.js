var test = require('tape');
window = {};
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    jQuery = require('jquery')(window);

    var freeverse = require("../../static/js/freeverse.js");
    window.fv.videos = jQuery.parseHTML(`
      <video id="video1">
        <source>
      </video>
      <video id="video2" class="hidden">
        <source>
      </video>
    `);

    test('video cycle unit test', (t) => {
      t.plan(1);

      console.dir(window.fv);

      t.equal(true, true);
    });
});
