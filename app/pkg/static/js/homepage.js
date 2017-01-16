$(document).ready(function () {
  $('#email-form').submit(function (eo) {
    eo.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'https://freeverse-emails.firebaseio.com/email.json',
      data: '{"address": "'+$("#fv-email").val()+'"}',
      success: function emailSuccess(data, eStatus, jqXHR) {
        $('#email-message')
          .empty()
          .append("<p>Thanks! We'll reach out as soon as we're ready to connect your first conversation.</p>");
      },
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8'
    });
  });

  /**
	 * Custom video background cycle
   */
  fv.initVideos('#video1', '#video2', '.fv-video');
});
