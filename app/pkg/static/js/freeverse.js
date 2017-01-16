(function( fv, $, undefined ) {
  //Video properties (private)
  var activeVideo = undefined;
  var hiddenVideo = undefined;
  var nextVid = 1;
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

  //Video Method (private)

  /**
   * nextVideo
   * returns a string for the URL of the next video to play.
  **/
  function nextVideo() {
    nextVid = nextVid >= vidSrcs.length ? 0 : nextVid + 1;
    return vidSrcs[nextVid];
  }
  /**
   * swapOnEnded
   * swaps the visible video with the hidden one when
   * the visible video ends.
   *
  **/
  function swapOnEnded() {
    activeVideo
      .addClass('hidden')
      .attr('src', nextVideo());
    hiddenVideo
      .removeClass('hidden')
      .get(0)
      .play();
    var temp = activeVideo;
    activeVideo = hiddenVideo;
    hiddenVideo = temp;
  }

  /**
   * pauseHidden
   * checks if a video is hidden and pauses it if it is
  **/
  function pauseHidden(eventObj) {
    var vid = eventObj.target;
    
    if($(vid).hasClass('hidden')) {
      vid.pause();
    }
  }

  //Video Methods (public)
  /**
   * initVideos
   * param activeVideoSel - a JQuery selector for the active video
   * param hiddenVideoSel - a JQuery selector for the hidden video
   * param videoSel - a JQuery selector for both videos
   * initializes the video swapping mechanism on the given elements.
  **/
  fv.initVideos = function(activeVideoSel, hiddenVideoSel, videoSel) {
    activeVideo = $(activeVideoSel);
    hiddenVideo = $(hiddenVideoSel);
    
    var $videos = $(videoSel);
    $videos.on('ended', swapOnEnded);
    $videos.on("canplay", pauseHidden);
  }

}( window.fv = window.fv || {}, jQuery ));
