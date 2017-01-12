/**
 * So, yeah, this needs cleaned up a bit. I'll get to it! Promise!
 *
 */

$(document).ready(function () {
/**
 * UserVoice setup
 */
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/zggE5fvmKBXzFII7z1fo8A.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

  /**
   * Email form
   */
  $("#email-form").submit(function (event) {
    event.preventDefault();
    var uvEmail = $("#fv-email").val();
    var uvName = uvEmail.substring(0, uvEmail.indexOf('@'));
    console.log("Sending name:"+uvName);
    console.log("Sending email:"+uvEmail);
    UserVoice.push(['identify', {
      email: uvEmail,
      name: uvName,
      created_at: new Date().getTime()
    }]);
  });

  /**
	 * Custom video background cycle
   */
  var nextVid = 2;
  var bktUrl = "https://s3.us-east-2.amazonaws.com/freeverse-videos/";
	var vidSrcs = [
		bktUrl+"woman-shelf-video-call2.mp4",
		bktUrl+"fro-woman-beach-call.mp4",
		bktUrl+"woman-typing-answering.mp4",
		bktUrl+"woman-coffee-call.mp4",
		bktUrl+"steadicam-video-call.mp4",
		bktUrl+"woman-beach-shoes-call.mp4",
		bktUrl+"woman-call-park.mp4",
		bktUrl+"glasses-man-video-call.mp4",
		bktUrl+"woman-fountain-call.mp4",
		bktUrl+"woman-irondoors-call.mp4",
		bktUrl+"woman-shelf-video-call.mp4",
		bktUrl+"rock-sea-call.mp4",
	];

  $('#video1').on("ended", function (eo) {
		$(this)
			.addClass('hidden')
			.attr('src', vidSrcs[nextVid]);
		$('#video2')
			.removeClass('hidden')
			.get(0)
			.play();
		nextVid = nextVid == 11 ? 0 : nextVid + 1;
  });
  $('#video2').on("ended", function (eo) {
		$(this)
			.addClass('hidden')
			.attr('src', vidSrcs[nextVid]);
		$('#video1')
			.removeClass('hidden')
			.get(0)
			.play();
		nextVid = nextVid == 11 ? 0 : nextVid + 1;
  });
  $('.fv-video').on("canplay", function (eo) {
		if($(this).hasClass('hidden')) {
			this.pause();
		}
  });
});
