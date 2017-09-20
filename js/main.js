(function() {

  const statURL = 'http://localhost:8281/hogwarts/stats';
  const newsURL = 'http://localhost:8280/hogwarts/news';

  var newsArticles = [];
  $('.more-news').each(function() {
    newsArticles.push($(this).attr('id'));
  });

  function updateReadCounts() {
    newsArticles.forEach(function(news) {
      $.get(statURL + '?id=' + news, function(responseText) {
        var response = $.parseXML(responseText);
        $xml = $(response);
        count = $xml.find('message').find('count').text();

        $('.tile-action #' + news).attr('data-badge', (count != 'null' ? count : 0));
      });
    });
  }

  updateReadCounts();

  function get(url, callback) {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200)
        callback(http.responseText);
    }
    http.open('GET', url, true);
    http.setRequestHeader('Content-Type', 'application/xml');
    http.send(null);
  }

  $('.close-modal, .stash-news').click(function() {
    $(this).closest('.modal').removeClass('active');
    updateReadCounts();
  });

  $('.more-news').click(function() {
    var url = newsURL + '?id=' + $(this).attr('id');

    $.get(url, function(responseText) {
      $('.modal').addClass('active');
      $('.modal-body .content').html(responseText);
    });
  });

})(jQuery);
