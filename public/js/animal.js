$(document).ready(function() {
  $('.delete-animal').on('click', function(e) {
    if (confirm('Esti sigur?')) {
      $target = $(e.target);
      const animal_id = $target.attr('data-animal-id');
      const proprietar_id = $target.attr('data-proprietar-id');
      $.ajax({
        type:'DELETE',
        url:'/proprietari/'+proprietar_id+'/animals/'+animal_id,
        success: function(response) {
          window.location.href='/proprietari/'+proprietar_id;
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