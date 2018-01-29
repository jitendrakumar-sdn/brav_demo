
$(document).ready(function () {
  $('#microphone').children().last().toggle();
  $('#camera').children().last().toggle();
  $('#phone').children().last().toggle();
  $('#record-icon').children().last().toggle();

  $("#chat").click(function () {
    $(".chat-panel").toggle();
    $(".notes-panel").hide();
    $(".alert-panel").hide();
  });
  $("#notes").click(function () {
    $(".notes-panel").toggle();
    $(".chat-panel").hide();
    $(".alert-panel").hide();
  });
  $("#alert-msg").click(function () {
    $(".alert-panel").toggle();
    $(".notes-panel").hide();
    $(".chat-panel").hide();
  });
});


function isValidEmail(email) {
  if (email && (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
    return true;
  }
  return false;
}
