/* globals $, window */
"use strict";

function editSubmission() {
  $(".actions").fadeOut("fast", function () {
    $("#publish-button").hide();
    $("#edit-button").val("Save");
    $("#edit-button").removeClass("edit-button");
    $("#edit-button").addClass("submit-button");
    $("#edit-button").attr("onclick", "saveSubmission()");
    $(".actions").fadeIn("fast");
  });
  $(".static-field").fadeOut("fast", function () {
    $(".edit-field").fadeIn("fast");
  });
}

function saveSubmission() {
  $("#success-message").fadeOut("slow");
  $("#error-message").fadeOut("slow");
  $("#edit-button").attr("disabled", "true");
  var firstName = $("input[name='firstName'").val();
  var lastName = $("input[name='lastName'").val();
  var cvLink = $("input[name='cvLink'").val();

  $.ajax({
    type: "POST",
    url: "/cv/submission/edit",
    data: {
      firstName: firstName,
      lastName: lastName,
      cvLink: cvLink
    },
    success: function (response) {
      if (response.err) {
        $("#error-message").html("Your submission was not updated! " + response.err);
        $("#error-message").fadeIn("slow");
      } else {
        $("#success-message").html("Your submission has been updated successfully!");
        $("#success-message").fadeIn("slow");
        $(".actions").fadeOut("fast", function () {
          $("#publish-button").show();
          $("#edit-button").val("Edit");
          $("#edit-button").addClass("edit-button");
          $("#edit-button").removeClass("submit-button");
          $("#edit-button").attr("onclick", "editSubmission()");
          $("#edit-button").attr("disabled", "true");
          $(".actions").fadeIn("fast");
        });
        $(".edit-field").fadeOut("fast", function () {
          $("#first-name").html(firstName);
          $("#last-name").html(lastName);
          $("#cv-link").html("<a href='" + cvLink + "' target='_blank' rel='noopener noreferrer'>" + cvLink + "</a>");
          $(".static-field").fadeIn("fast");
        });
      }
    }
  });
}
