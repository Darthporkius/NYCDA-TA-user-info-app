

$('#search-button input').on('keyup', function() {
  var query = $('#search-button input').val();
  console.log($('#search-button input').val());

  if (query !== "") {
    $.get('/api/search/' + query, function(data) {
      console.log(data);
      $(".jl-app-search-results").html('');
      data.forEach(function(element) {
        $(".jl-app-search-results").append(
          $("<li>" + element.firstname + ' ' + element.lastname + '</li>')
          );
        });
      });
    }
  });

var likeclicked = false;

//The if statement here will prevent the user from liking more then
//once. Upon refresh the user will be able to like the site again.
//Need cookies to do it properly.
$('.jl-like-button').on('click', function() {
  if (likeclicked == false) {
  $.post('/like', function(data) {
    $('.jl-like-button').text('LIKES: ' + data.likeCount);
    console.log(data.likeCount);
    console.log('like finished');
    likeclicked = true;
  });
  } else {
    console.log('User has already liked the site.');
  }
});