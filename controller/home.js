exports.home = (req, res) => {
  res.render('index', {
    pageTitle: 'Signup',
    path: ''
  });
};
