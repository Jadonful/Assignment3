var express = require('express');
var router = express.Router();
const passport = require('passport');
let userModel = require('../model/user');
let User = userModel.User;

// Home page
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Assignment Tracker',
    displayName: req.user ? req.user.displayName : ''
  });
});

// Main home page
router.get('/home', function(req, res) {
  res.render('index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName : ''
  });
});

// Show assignments list
router.get('/', async (req, res) => {
  const assignments = await Assignment.find();

  res.render('Assignments/list', {
    title: 'Assignments',
    assignments,
    displayName: req.user ? req.user.displayName : ''
  });
});




module.exports = router;
