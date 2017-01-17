(function( fv, $, undefined ) {
  //Video properties (private)
  var nextVid = 1;
  var bktUrl = "http://dne1cy8cevv0k.cloudfront.net/";
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
  
  //Video properties (public)
  fv.videos = [];

  //Video Methods (public)
  /**
   * swapOnEnded
   * swaps the visible video with the hidden one when
   * the visible video ends.
   *
  **/
  fv.onEndedHandler = function(eo) {
    var activeVideo = eo.target;
    var hiddenVideo = fv.getOtherVideo(eo.target);
    fv.hideVideo(activeVideo);
    fv.playVideo(hiddenVideo);
  };

  /**
   * hideVideo
   * param video - a video element
   * hides the given video and updates its source
  **/
  fv.hideVideo = function(video) {
    $(video).addClass('hidden').attr('src', fv.nextVideo());
  };

  /**
   * playVideo
   * param video - a video element
   * makes the given video element visible and starts playing it
  **/
  fv.playVideo = function(video) {
    $(video).removeClass('hidden');
    video.play();
  };

  /**
   * getOtherVideo
   * param videoElem - one of the two video elements on the page
   * returns the other video element on the page
  **/
  fv.getOtherVideo = function(videoElem) {
    if($(videoElem).is(fv.videos[0])) {
      return fv.videos[1];
    } else {
      return fv.videos[0];
    }
  };

  /**
   * nextVideo
   * returns a string for the URL of the next video to play.
  **/
  fv.nextVideo = function() {
    nextVid = nextVid >= vidSrcs.length ? 0 : nextVid + 1;
    return vidSrcs[nextVid];
  };

  /**
   * pauseHidden
   * checks if a video is hidden and pauses it if it is
  **/
  fv.pauseHidden = function(eo) {
    var vid = eo.target;
    
    if($(vid).hasClass('hidden')) {
      vid.pause();
    }
  };

}( window.fv = window.fv || {}, jQuery ));
