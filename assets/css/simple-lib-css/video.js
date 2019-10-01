
$('.modal').on('hidden.bs.modal', function(e) {
    var closestIframe = $(e.currentTarget).find('iframe');
    var rawVideoURL = $("iframe")[0].src;

    closestIframe[0].src = "";
    closestIframe[0].src = rawVideoURL;
  });

$('.pull-right').click(function() {
    $('.load').hide();
});