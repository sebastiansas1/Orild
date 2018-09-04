$(document).ready(function() {
  $('#next-modal-proprietar').click(function() {
    $('.proprietar-modal-body').hide();
    $('.progress-bar').css('width', '66%');
    $('.progress-message').text('2/3');
    $('.animal-modal-body').show();
  });
  $('#prev-modal-animal').click(function() {
    $('.proprietar-modal-body').show();
    $('.progress-bar').css('width', '33%');
    $('.progress-message').text('1/3');
    $('.animal-modal-body').hide();
  });

  $('#next-modal-animal').click(function() {
    $('.animal-modal-body').hide();
    $('.progress-bar').css('width', '100%');
    $('.progress-message').text('3/3');
    $('.tratament-modal-body').show();
  });
  $('#prev-modal-tratament').click(function() {
    $('.animal-modal-body').show();
    $('.progress-bar').css('width', '66%');
    $('.progress-message').text('2/3');
    $('.tratament-modal-body').hide();
  });

  $('#save-everything').click(function() {
    // Button Busy
    $(this).toggleClass('btn-success');
    $(this).prop('disabled', 'true');
    $(this).val('Salvez...');
    $(this).css('cursor', 'progress');

    // Proprietar
    var proprietar_name = $('#proprietar_name_modal').val();
    var proprietar_phone = $('#phone_num').val();
    var proprietar_address = $('#search_term').val();

    // Animal
    var animal_name = $('#animal_name_modal').val();
    var animal_species = $('#animal_species_modal').val();
    var animal_quantity = $('#number').val();
    var animal_simptomatologie = $('#simptomatologie_modal').val();
    var animal_diagnostic = $('#diagnosticul_modal').val();

    // Tratament
    var tratament_name = $('#tratament_name').val();
    var tratament_series = $('#tratament_series').val();
    var tratament_dose = $('#dose').val();
    var tratament_expiry = $('#expiry').val();
    var tratament_date = $('#administration_date').val();
    var tratament_waiting_time = $('#tratament_waiting_time').val();
    var tratament_duration = $('#tratament_duration').val();
    var tratament_result = $('#tratament_result').val();
    var tratament_observations = $('#tratament_observations').val();

    $.ajax({
      type: 'POST',
      url: '/proprietari/addAll',
      data: {
        proprietar_name,
        proprietar_phone,
        proprietar_address,
        animal_name,
        animal_species,
        animal_quantity,
        animal_simptomatologie,
        animal_diagnostic,
        tratament_name,
        tratament_series,
        tratament_dose,
        tratament_expiry,
        tratament_date,
        tratament_waiting_time,
        tratament_duration,
        tratament_result,
        tratament_observations
      },
      success: function() {
        window.location.href = '/proprietari';
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('#save-animal-tratament').click(function() {
    // Button Busy
    $(this).toggleClass('btn-success');
    $(this).prop('disabled', 'true');
    $(this).val('Salvez...');
    $(this).css('cursor', 'progress');

    // Proprietar ID
    var proprietar_id = $('#animal_name_modal').attr('proprietar_id');

    // Animal
    var animal_name = $('#animal_name_modal').val();
    var animal_species = $('#animal_species_modal').val();
    var animal_quantity = $('#number').val();
    var animal_simptomatologie = $('#simptomatologie_modal').val();
    var animal_diagnostic = $('#diagnosticul_modal').val();

    // Tratament
    var tratament_name = $('#tratament_name').val();
    var tratament_series = $('#tratament_series').val();
    var tratament_dose = $('#dose').val();
    var tratament_expiry = $('#expiry').val();
    var tratament_date = $('#administration_date').val();
    var tratament_waiting_time = $('#tratament_waiting_time').val();
    var tratament_duration = $('#tratament_duration').val();
    var tratament_result = $('#tratament_result').val();
    var tratament_observations = $('#tratament_observations').val();

    $.ajax({
      type: 'POST',
      url: '/proprietari/addAnimalAndTratament',
      data: {
        proprietar_id,
        animal_name,
        animal_species,
        animal_quantity,
        animal_simptomatologie,
        animal_diagnostic,
        tratament_name,
        tratament_series,
        tratament_dose,
        tratament_expiry,
        tratament_date,
        tratament_waiting_time,
        tratament_duration,
        tratament_result,
        tratament_observations
      },
      success: function() {
        window.location.href = '/proprietari/' + proprietar_id;
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
