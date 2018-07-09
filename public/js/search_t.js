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
  $('.search-proprietar').keyup(function(e) {
    const term = e.target.value.toLowerCase();
    $('.proprietar').each(function(index) {
      if($(this).attr('proprietar-search').toLowerCase().indexOf(term) != -1) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('.search-animal').keyup(function(e) {
    const term = e.target.value.toLowerCase();
    $('.animal').each(function(index) {
      if($(this).attr('animal-search').toLowerCase().indexOf(term) != -1) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('.filter-animal').change(function(e) {
    const term = e.target.value.toLowerCase();
    $('.animal').each(function(index) {
      if($(this).attr('filter-animal').toLowerCase().indexOf(term) != -1) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
});