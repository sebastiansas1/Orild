$(document).ready(function() {
  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // CheckBoxes
  $(':checkbox').checkboxpicker({
    html: true,
    offLabel: '<span class="fas fa-times">',
    onLabel: '<span class="fas fa-check">'
  });

  $('#clinicSanatos').on('change', function() {
    $(this).toggleClass('checkedHealthy');
    if ($(this).hasClass('checkedHealthy')) {
      $('#simptomatologie_modal').val('');
      $('#simptomatologie_modal').val('Clinic sănătos');
      $('#diagnosticul_modal').val('Vaccinare hexavalentă');
    } else {
      $('#simptomatologie_modal').val('');
      $('#diagnosticul_modal').val('');
    }
  });

  $('#animal_name_modal').keyup(function() {
    var name = $(this).val();
    var species = $('#animal_species_modal').val();
    var button = $('#next-modal-animal');
    if (name && species) {
      button.prop('disabled', false);
      button.css('cursor', 'pointer');
    } else {
      button.prop('disabled', true);
      button.css('cursor', 'not-allowed');
    }
  });

  $('#animal_species_modal').change(function() {
    var name = $('#animal_name_modal').val();
    var species = $(this).val();
    var button = $('#save-animal');
    if (name && species) {
      button.prop('disabled', false);
      button.css('cursor', 'pointer');
    } else {
      button.prop('disabled', true);
      button.css('cursor', 'not-allowed');
    }
  });

  // Delete Method
  $('.delete-animal').on('click', function(e) {
    $('#animalModal').modal('toggle');

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
          const animal_id = $target.attr('data-animal-id');
          const proprietar_id = $target.attr('data-proprietar-id');
          $.ajax({
            type: 'DELETE',
            url: '/proprietari/' + proprietar_id + '/animals/' + animal_id,
            success: function(response) {
              window.location.href = '/proprietari/' + proprietar_id;
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
});
