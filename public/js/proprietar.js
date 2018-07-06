$(document).ready(function() {
  $('.delete-proprietar').on('click', function(e) {
    if (confirm('Esti sigur?')) {
      $target = $(e.target);
      const id = $target.attr('data-id');
      const animal_id = $target.attr('data-animal-id');
      $.ajax({
        type:'DELETE',
        url:'/proprietari/'+id,
        data: JSON.stringify({
          animal_id: animal_id
        }),
        success: function(response) {
          window.location.href='/proprietari';
        },
        error: function(err) {
          console.log(err);
        }
      });
    } else {
      return false;
    }
  });
});