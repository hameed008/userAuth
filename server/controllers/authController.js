const User = require('../models/userModel');
const passport = require('passport');

exports.getLogin = (req, res) => res.render('login', { message: req.flash('error') });


exports.postLogin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
});


exports.getRegister = (req, res) => {
  res.render('register')
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      req.flash('error', 'Username already exists please Login');
      return res.redirect('login');
    }
    const newUser = new User({ username, password });

    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

exports.getDashboard = async (req, res) => {

  const { username } = req.user;
  const user = await User.findOne({ username });

  if (!req.isAuthenticated()) return res.redirect('/login');
  if (user.is_logged_in) {
    res.redirect('/request')
  } else {
    user.is_logged_in = true;
    await user.save()
  }
  res.render('dashboard', { username: req.user.username });
};

exports.getApproved = async (req, res) => {
  res.render('request')
}

exports.getAdmin = async (req, res) => {
  res.render('admin')
}


exports.postAdminLogin = passport.authenticate('local', {
  successRedirect: '/aprove',
  failureRedirect: '/admin',
  failureFlash: true,
});

exports.aprovedUser = async (req, res) => {
  res.render('aprove')
}

exports.postAdminAproval = async (req, res) => {

  const { username } = req.body
  const user = await User.findOne({ username });
  if (!req.isAuthenticated()) return res.redirect('/login');
  user.is_logged_in = false
  user.save()
  res.redirect('/aproved-sucess')
}


exports.aprovedUserSuccess = async (req, res) => {
  res.render('aproved-sucess')
}


exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Error logging out');
    res.redirect('/login');
  });
};
