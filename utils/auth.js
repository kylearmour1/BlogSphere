const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login?error=notloggedin");
  } else {
    next();
  }
};

module.exports = withAuth;
