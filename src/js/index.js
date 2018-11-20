var picSelected = -1;

document
  .getElementById("join_pill_button")
  .addEventListener("click", function() {
    $("#joinModal").addClass("jello");
    $("#joinModal").modal({ backdrop: false });
    $("#home_container").css("display", "none");
  });

document
  .getElementById("login_pill_button")
  .addEventListener("click", function() {
    $("#loginModal").addClass("jello");
    $("#loginModal").modal({ backdrop: false });
    $("#home_container").css("display", "none");
  });

$("#joinModal").on("show.bs.modal", function() {
  var closeBtns = $("#joinModal").find('button[data-custom-dismiss="modal"]');
  closeBtns.one("click", function() {
    $("#joinModal").on(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function() {
        $("#joinModal").modal("hide");
        $("#home_container").css("display", "block");
        $("#joinModal").off(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend"
        );
      }
    );
    $("#joinModal")
      .removeClass("jello")
      .addClass("bounceOut");
  });
});

$("#joinModal").on("hidden.bs.modal", function() {
  var closeBtns = $("#joinModal").find('button[data-custom-dismiss="modal"]');
  $("#joinModal").removeClass("bounceOut");
  $("#joinModal").off(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend"
  );
  document.getElementById("username_input").value = "";
  closeBtns.off("click");
});

$("#loginModal").on("show.bs.modal", function() {
  var closeBtns = $("#loginModal").find('button[data-custom-dismiss="modal"]');
  closeBtns.one("click", function() {
    $("#loginModal").on(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function() {
        $("#loginModal").modal("hide");
        $("#home_container").css("display", "block");
        $("#loginModal").off(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend"
        );
      }
    );
    $("#loginModal")
      .removeClass("jello")
      .addClass("bounceOut");
  });
});

$("#loginModal").on("hidden.bs.modal", function() {
  var closeBtns = $("#loginModal").find('button[data-custom-dismiss="modal"]');
  $("#loginModal").removeClass("bounceOut");
  closeBtns.off("click");
});

document
  .getElementById("joinModal_continue1")
  .addEventListener("click", function() {
    if (
      document.getElementById("username_input").value.replace(/\W/g, "")
        .length >= 4
    ) {
      $("#joinModal_slide1").addClass("fadeOut");
      $("#joinModal_slide1").on(
        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        function() {
          $("#joinModal_slide1").css("display", "none");
          $("#joinModal_slide1").removeClass("fadeOut");
          $("#joinModal_slide2").addClass("fadeIn");
          $("#joinModal_slide2").css("display", "block");
          $("#joinModal_slide2").off(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend"
          );
        }
      );
    }
  });

document
  .getElementById("joinModal_back1")
  .addEventListener("click", function() {
    $("#joinModal_slide2").addClass("fadeOut");
    $("#joinModal_slide2").on(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function() {
        $("#joinModal_slide2").css("display", "none");
        $("#joinModal_slide2").removeClass("fadeOut");
        $("#joinModal_slide1").addClass("fadeIn");
        $("#joinModal_slide1").css("display", "block");
        $("#joinModal_slide1").off(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend"
        );
      }
    );
  });

$(".pic_card_button").on("click", function() {
  $(".pic_card_selected").removeClass("pic_card_selected");
  $(this).addClass("pic_card_selected");
  picSelected = $(this).attr("picID");
});

document
  .getElementById("joinModal_continue2")
  .addEventListener("click", function() {
    if (picSelected != -1) {
      $("#joinModal_slide2").addClass("fadeOut");
      $("#joinModal_slide2").on(
        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        function() {
          $("#joinModal_slide2").css("display", "none");
          $("#joinModal_slide2").removeClass("fadeOut");
          $("#joinModal_slide3").addClass("fadeIn");
          $("#joinModal_slide3").css("display", "block");
          $("#joinModal_slide2").off(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend"
          );
          $.ajax({
            type: "POST",
            url: "/api/auth/account",
            data: {
              username: document.getElementById("username_input").value,
              pictureID: picSelected
            },
            statusCode: {
              200: function(data) {
                $("#joinModal_slide3").addClass("fadeOut");
                $("#joinModal_slide3").on(
                  "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                  function() {
                    $("#uniqueid_holder").attr("placeholder", data);
                    $("#joinModal_slide3").css("display", "none");
                    $("#joinModal_slide3").removeClass("fadeOut");
                    $("#joinModal_slide4").addClass("fadeIn");
                    $("#joinModal_slide4").css("display", "block");
                    $("#joinModal_slide3").off(
                      "webkitAnimationEnd oanimationend msAnimationEnd animationend"
                    );
                  }
                );
              }
            }
          });
        }
      );
    }
  });

document
  .getElementById("joinModal_continue3")
  .addEventListener("click", function() {
    $("#joinModal_slide4").addClass("fadeOut");
    $("#joinModal_slide4").on(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function() {
        $("#joinModal_slide4").css("display", "none");
        $("#joinModal_slide4").removeClass("fadeOut");
        $("#joinModal_slide3").addClass("fadeIn");
        $("#joinModal_slide3").css("display", "block");
        $("#joinModal_slide4").off(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend"
        );
        $.ajax({
          type: "GET",
          url: "/api/rooms",
          statusCode: {
            200: function(data) {
              console.log(data);
              $("#joinModal_slide3").removeClass("fadeIn");
              $("#joinModal_slide3").addClass("fadeOut");
              $("#joinModal_slide3").on(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                function() {
                  $("#joinModal_slide3").css("display", "none");
                  $("#joinModal_slide3").removeClass("fadeOut");
                  $("#joinModal").addClass("bounceOut");
                  $("#joinModal").on(
                    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                    function() {
                      $("#dashboardModal").addClass("bounceIn");
                      $("#dashboardModal").modal({ backdrop: false });
                      $("#joinModal").off(
                        "webkitAnimationEnd oanimationend msAnimationEnd animationend"
                      );
                    }
                  );
                  $("#joinModal_slide3").off(
                    "webkitAnimationEnd oanimationend msAnimationEnd animationend"
                  );
                }
              );
            }
          }
        });
      }
    );
  });
