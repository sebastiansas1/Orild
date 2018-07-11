$(document).ready(function() {
  // Delete Method
  $(".delete-animal").on("click", function(e) {
    $("#animalModal").modal("toggle");

    $("#dialog-message").css("display", "inherit");

    $("#dialog-confirm").dialog({
      resizable: false,
      height: "auto",
      fluid: true, 
      modal: true,
      buttons: {
        Stergeti: function() {
          $(this).dialog("close");
          $target = $(e.target);
          const animal_id = $target.attr("data-animal-id");
          const proprietar_id = $target.attr("data-proprietar-id");
          $.ajax({
            type: "DELETE",
            url: "/proprietari/" + proprietar_id + "/animals/" + animal_id,
            success: function(response) {
              window.location.href = "/proprietari/" + proprietar_id;
            },
            error: function(err) {
              console.log(err);
            }
          });
        },
        Inapoi: function() {
          $(this).dialog("close");
          return false;
        }
      }
    });
    $(".ui-dialog-buttonpane")
      .find('button:contains("Stergeti")')
      .addClass("btn btn-danger");
    $(".ui-dialog-buttonpane")
      .find('button:contains("Inapoi")')
      .addClass("btn btn-dark");
  });
});
