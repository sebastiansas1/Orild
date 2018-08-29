$(document).ready(function() {
  // Dot Click Handle
  $('.dot').each(function() {
    $(this).on('click', function(e) {
      $target = $(e.target);
      $target.toggleClass('full-dot', 130);
      const reminder_id = $target.attr('reminder-id');

      $.ajax({
        type: 'POST',
        url: '/reminders/read/' + reminder_id,
        success: function(res) {
          console.log('Reminder Id ' + reminder_id + 'was read succesfully!');
        },
        error: function(err) {
          console.log('Failed reminder update!');
        }
      });
    });
  });

  $('.delete-inbox').each(function() {
    $(this).hover(function() {
      $(this)
        .children()
        .toggleClass('white-icon');
    });
  });
});
