$(document).keydown(function(e) {
  console.log(e.key);
  $("h1").html(e.key);
})
