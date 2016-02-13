document.addEventListener('DOMContentLoaded', function(){
  var button = document.querySelector('.quote');
  console.log(button);

  function getQuote() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40&callback=', true);

    request.onload = function() {
      if(this.status >= 200 && this.status < 400){
        var random = Math.round(Math.random() * 40);
        var data = JSON.parse(this.response);
        button.innerHTML = data[random].content + '<i class="author"> - ' + data[random].title + '</i>';
      } else {
        console.error("There was an error returning your request.  Please try again later.");
      }
    };

    request.onerror = function() {
      console.error("There was an error contacting the server.  Please try again later.");
    };

    request.send();
  }

  getQuote();
  button.onclick = getQuote;

});
