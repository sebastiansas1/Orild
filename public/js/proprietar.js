$(document).ready(function() {
  $('.delete-proprietar').on('click', function(e) {
    if (confirm('Esti sigur?')) {
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url:'/proprietari/'+id,
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