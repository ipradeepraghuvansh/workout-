const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register
router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res, next) => {
  const { username, password, age, gender, fitnessGoal } = req.body;
  User.register(new User({ username, age, gender, fitnessGoal }), password, (err, user) => {
    if (err) return res.render('register', { error: err.message });
    next(null, user);
  }, (err, user) => {
    if (err) return res.render('register', { error: err.message });
    passport.authenticate('local')(req, res, () => res.redirect('/workouts'));
  });
});

// Login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/workouts',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/login'));
});

module.exports = router;