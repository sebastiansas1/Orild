$(document).ready(function() {
  $('.search-item').keyup(function(e) {
    const term = e.target.value.toLowerCase();
    $('.item').each(function(index) {
      if($(this).attr('data-search').toLowerCase().indexOf(term) != -1) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('.filter-item').change(function(e) {
    const term = e.target.value.toLowerCase();
    $('.item').each(function(index) {
      if($(this).attr('filter-search').toLowerCase().indexOf(term) != -1) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
});