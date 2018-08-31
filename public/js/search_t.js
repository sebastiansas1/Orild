$(document).ready(function() {
  $('.search-tratamente').keyup(function(e) {
    const tratament_name = e.target.value.toLowerCase();
    $('.inbox-list').each(function(index) {
      if (
        $(this)
          .attr('data-search')
          .toLowerCase()
          .indexOf(tratament_name) != -1
      ) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('.search-proprietar').keyup(function(e) {
    const proprietar_name = e.target.value.toLowerCase();
    $('.proprietar').each(function(index) {
      if (
        $(this)
          .attr('proprietar-search')
          .toLowerCase()
          .indexOf(proprietar_name) != -1
      ) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('#search-animal').keyup(function(e) {
    const searched_animal_name = e.target.value.toLowerCase();
    const searched_animal_species = $('.filter-animal').val();

    $('.animal-item-list').each(function(index) {
      var this_animal_name = $(this)
        .attr('animal-name')
        .toLowerCase();
      var this_animal_species = $(this)
        .attr('animal-species')
        .toLowerCase();

      if (
        this_animal_name.indexOf(searched_animal_name) != -1 &&
        this_animal_species.indexOf(searched_animal_species) != -1
      ) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
  $('.filter-animal').change(function(e) {
    const searched_animal_species = e.target.value.toLowerCase();
    const searched_animal_name = $('#search-animal')
      .val()
      .toLowerCase();

    $('.animal-item-list').each(function(index) {
      var this_animal_name = $(this)
        .attr('animal-name')
        .toLowerCase();
      var this_animal_species = $(this)
        .attr('animal-species')
        .toLowerCase();

      if (
        this_animal_species.indexOf(searched_animal_species) != -1 &&
        this_animal_name.indexOf(searched_animal_name) != -1
      ) {
        $(this).show(400);
      } else {
        $(this).hide(400);
      }
    });
  });
});
