console.log("Sanity Check: JS is working!");
var pr;

$(document).ready(function(){

  $(".projectsForm").on("submit", function(){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/projects',
      data: $(this).serialize(),
      dataType: 'json',
      success: show
    });
  });

  $.ajax({
    method: 'GET',
    url: '/api/projects',
    dataType: 'json',
    success: appendProjects
  });

  for(var i=0; i<5; i++){
    $(".star"+(i+1)).parent().children(':first-child').val(i+1);
    $(document).on('mouseover', '.star'+(i+1), function(){
      $(this).css('color', 'yellow');
      $(this).prevAll().css('color', 'yellow');
    });
    $(document).on('mouseout', '.star'+(i+1), function(){
      $(this).css('color', 'white');
      $(this).prevAll().css('color', 'white');
    });
    $(document).on('click', '.star'+(i+1), function(){

      console.log($(this).parent().children(':first-child'));
      $.ajax({
        method:'POST',
        url: '/api/rate',
        data: $(this).parent().serialize(),
        dataType: 'json',
        success: showNewRating
      });
    });
  }

});

function showNewRating(json){
  $('.r').text(json.rating);
}

function show(json){
  console.log(json);
}


function appendProjects(json){
  var source = $('.deliverables-list').html();
  var template = Handlebars.compile(source);
  var appendHTML = template({pr: json[0].projects});

  $('.projects').append(appendHTML);
}
