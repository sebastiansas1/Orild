$(document).ready(function() {
  // Delete Method
  $('.delete-reminder').on('click', function(e) {
    $target = $(e.target);
    var reminder_id = $target.attr('reminder-id');
    $.ajax({
      type: 'DELETE',
      url: '/reminders/' + reminder_id,
      success: function(response) {
        window.location.href = '/reminders/';
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('.fa-calendar-alt').on('click', function(e) {
    window.location.href = '/reminders';
  });

  $('.dropdown-top-bar').hover(function(e) {
    $('.nav-icon').toggleClass('focused-top-bar', 100);
  });

  $('.inbox').each(function(e) {
    $(this).hover(function() {
      $(this)
        .children('.delete-dropdown-item')
        .toggleClass('show-delete', 100);
      $(this)
        .find('.fa-times')
        .toggleClass('rotate-icon', 100);
    });
  });

  $('.inbox-danger').each(function(e) {
    $(this).hover(function() {
      $(this)
        .children('.delete-dropdown-item')
        .toggleClass('show-delete', 100);
      $(this)
        .find('.fa-times')
        .toggleClass('rotate-icon', 100);
    });
  });

  $('.delete-reminder-mini').on('click', function(e) {
    $target = $(e.target);
    var reminder_id = $target.attr('reminder-id');
    $.ajax({
      type: 'DELETE',
      url: '/reminders/' + reminder_id,
      success: function(response) {
        window.location.href = '/';
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('.reminder').on('click', function(e) {
    $target = $(e.target);

    var reminder_id = $(this)
      .parent()
      .attr('reminder-id');

    var tratament_id = $(this)
      .parent()
      .attr('tratament-id');

    var animal_id = $(this)
      .parent()
      .attr('animal-id');

    $.ajax({
      type: 'POST',
      url: '/reminders/read/' + reminder_id,
      success: function(res) {
        window.location.href =
          '/animals/' + animal_id + '/tratamente/' + tratament_id;
      },
      error: function(err) {
        console.log('Failed reminder update!');
      }
    });
  });
});
