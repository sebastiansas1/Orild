$(document).ready(function() {
  $('.delete-proprietar').on('click', function(e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/proprietari/'+id,
      success: function(response) {
        alert('Delete Proprietar');
        window.location.href='/proprietari';
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});