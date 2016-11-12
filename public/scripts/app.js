console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $("#project1").on("submit", function(){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/projects',
      data: $("#project1").serialize(),
      dataType: 'json',
      success: show
    });
  });
});

function show(json){
  console.log(json);
}
