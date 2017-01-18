(function( fvVideos, $, undefined ) {
  //Video properties (private)
  var nextVid = 1;
  var bktUrl = "http://dne1cy8cevv0k.cloudfront.net/";
  
  //Video properties (public)
	fvVideos.vidSrcs = [
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
  fvVideos.videos = [];

  //Video Methods (public)
  /**
   * onEndedHandler
   * swaps the visible video with the hidden one when
   * the visible video ends.
   *
  **/
  fvVideos.onEndedHandler = function(eo) {
    var activeVideo = eo.target;
    var hiddenVideo = fvVideos.getOtherVideo(eo.target);
    fvVideos.hideVideo(activeVideo);
    fvVideos.playVideo(hiddenVideo);
  };

  /**
   * hideVideo
   * param video - a video element
   * hides the given video and updates its source
  **/
  fvVideos.hideVideo = function(video) {
    $(video).addClass('hidden').attr('src', fvVideos.nextVideo());
  };

  /**
   * playVideo
   * param video - a video element
   * makes the given video element visible and starts playing it
  **/
  fvVideos.playVideo = function(video) {
    $(video).removeClass('hidden');
    video.play();
  };

  /**
   * getOtherVideo
   * param videoElem - one of the two video elements on the page
   * returns the other video element on the page
  **/
  fvVideos.getOtherVideo = function(videoElem) {
    if($(videoElem).is(fvVideos.videos[0])) {
      return fvVideos.videos[1];
    } else {
      return fvVideos.videos[0];
    }
  };

  /**
   * nextVideo
   * returns a string for the URL of the next video to play.
  **/
  fvVideos.nextVideo = function() {
    nextVid = nextVid >= fvVideos.vidSrcs.length - 1 ? 0 : nextVid + 1;
    return fvVideos.vidSrcs[nextVid];
  };

  /**
   * pauseHidden
   * checks if a video is hidden and pauses it if it is
  **/
  fvVideos.pauseHidden = function(eo) {
    var vid = eo.target;
    
    if($(vid).hasClass('hidden')) {
      vid.pause();
    }
  };

}( window.fvVideos = window.fvVideos || {}, jQuery ));
