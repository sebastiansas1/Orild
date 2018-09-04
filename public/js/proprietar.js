$(document).ready(function() {
  $('#proprietar_name_modal').keyup(function() {
    var name = $(this).val();
    var button = $('#next-modal-proprietar');
    if (name) {
      button.prop('disabled', false);
      button.css('cursor', 'pointer');
    } else {
      button.prop('disabled', true);
      button.css('cursor', 'not-allowed');
    }
  });

  if ($('#proprietar_name_modal').val() !== '') {
    $('#next-modal-proprietar').prop('disabled', false);
    $('#next-modal-proprietar').css('cursor', 'pointer');
  }

  $('.proprietar_name').each(function() {
    $(this).text(toTitleCase($(this).text()));
  });

  $('#btnLogin').click(function() {
    // Button Busy
    $(this).toggleClass('btn-success');
    $(this).prop('readonly', 'true');
    $(this).val('Accesând...');
    $(this).css('cursor', 'progress');
  });

  // Delete Method
  $('.delete-proprietar').on('click', function(e) {
    $('#proprietarModal').modal('toggle');

    $('#dialog-message').css('display', 'inherit');

    $('#dialog-confirm').dialog({
      resizable: false,
      height: 'auto',
      fluid: true,
      modal: true,
      buttons: {
        Stergeti: function() {
          $(this).dialog('close');
          $target = $(e.target);
          const id = $target.attr('data-id');
          const animal_id = $target.attr('data-animal-id');
          $.ajax({
            type: 'DELETE',
            url: '/proprietari/' + id,
            data: JSON.stringify({
              animal_id: animal_id
            }),
            success: function(response) {
              window.location.href = '/proprietari';
            },
            error: function(err) {
              console.log(err);
            }
          });
        },
        Inapoi: function() {
          $(this).dialog('close');
          return false;
        }
      }
    });
    $('.ui-dialog-buttonpane')
      .find('button:contains("Stergeti")')
      .addClass('btn btn-danger');
    $('.ui-dialog-buttonpane')
      .find('button:contains("Inapoi")')
      .addClass('btn btn-light');
  });

  // Custom Methods
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});
