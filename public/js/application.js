
//To do the onetime press you can use the if statement or 
//you can write this in line 6
//$('#search-button input').one('keyup', function() {
//Your write one instead of on. The handeler is executed at least once.
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


//The if statement here will prevent the user from liking more then
//once. Upon refresh the user will be able to like the site again.
//Need cookies to do it properly or better yet the server should prevent
//should remmber that the page was liked by the user.
// var likeclicked = false;
// $('.jl-like-button').on('click', function() {
//   if (likeclicked == false) {
//   $.post('/like', function(data) {
//     $('.jl-like-button').text('LIKES: ' + data.likeCount);
//     console.log(data.likeCount);
//     console.log('like finished');
//     likeclicked = true;
//   });
//   } else {
//     console.log('User has already liked the site.');
//   }
// });
//A better way to limit the addition of like is written in the 
//index.js by saving a true and false in the likes.json file.


$('.jl-like-button').on('click', function() {
  $.post('/like', function(data) {
    $('.jl-like-button').text('LIKES: ' + data.likeCount);
    console.log(data.likeCount);
    console.log('like finished');
  });
});
