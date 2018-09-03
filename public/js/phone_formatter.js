$(document).ready(function() {
  $('#phone_num').keyup(function(e) {
    if (e.keyCode != 8) {
      var str = $(this).val();
      var unformatted_nr = [];
      var formatted_nr = '';
      var isNumber = str.match(/\d+/g);

      str = str.replace(/[^0-9\.]+/g, '');

      if (str.length > 3 && isNumber) {
        if (str.length > 4 && str.length < 8) {
          unformatted_nr = str.split('');
          unformatted_nr.splice(0, 0, '(');
          unformatted_nr.splice(5, 0, ')');
          unformatted_nr.splice(6, 0, ' ');
          formatted_nr = unformatted_nr.toString().replace(/,+/g, '');
          $(this).val(formatted_nr);
        }

        if (str.length >= 8) {
          unformatted_nr = str.split('');
          unformatted_nr.splice(0, 0, '(');
          unformatted_nr.splice(5, 0, ')');
          unformatted_nr.splice(6, 0, ' ');
          unformatted_nr.splice(10, 0, ' ');
          formatted_nr = unformatted_nr.toString().replace(/,+/g, '');
          $(this).val(formatted_nr);
        }
      }
    }
  });

  var str = $('#phone_num_from_db').val();
  var unformatted_nr = [];
  var formatted_nr = '';
  var isNumber = str.match(/\d+/g);

  str = str.replace(/[^0-9\.]+/g, '');

  if (str.length > 3 && isNumber) {
    if (str.length > 4 && str.length < 8) {
      unformatted_nr = str.split('');
      unformatted_nr.splice(0, 0, '(');
      unformatted_nr.splice(5, 0, ')');
      unformatted_nr.splice(6, 0, ' ');
      formatted_nr = unformatted_nr.toString().replace(/,+/g, '');
      $('#phone_num_from_db').val(formatted_nr);
    }

    if (str.length >= 8) {
      unformatted_nr = str.split('');
      unformatted_nr.splice(0, 0, '(');
      unformatted_nr.splice(5, 0, ')');
      unformatted_nr.splice(6, 0, ' ');
      unformatted_nr.splice(10, 0, ' ');
      formatted_nr = unformatted_nr.toString().replace(/,+/g, '');
      $('#phone_num_from_db').val(formatted_nr);
    }
  }
});
