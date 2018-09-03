// Access Control
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('info', 'Va rugam sa va autentificati.');
    req.session.returnTo = req.path;
    res.redirect('/users/login');
  }
};
