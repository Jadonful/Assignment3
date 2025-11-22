const express = require('express');
const router = express.Router();
const Assignment = require('../model/assignment');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('Assignments/list', {
      title: 'Assignments',
      assignments
    });
  } catch (err) {
    console.log(err);
    res.send("Error loading assignments");
  }
});

// Show add page
router.get('/add', (req, res) => {
  res.render('Assignments/add', {
    title: 'Add Assignment',
    error: null
  });
});

// Save new assignment
router.post('/add', async (req, res) => {
  try {
    await Assignment.create({
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      status: req.body.status,
      description: req.body.description
    });

    res.redirect('/assignments');
  } catch (err) {
    console.log(err);
    res.render('Assignments/add', {
      title: 'Add Assignment',
      error: 'All required fields must be filled out'
    });
  }
});

// Show edit page
router.get('/edit/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render('Assignments/edit', {
      title: 'Edit Assignment',
      assignment
    });
  } catch (err) {
    console.log(err);
    res.redirect('/assignments');
  }
});

// Update assignment
router.post('/edit/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      status: req.body.status,
      description: req.body.description
    });

    res.redirect('/assignments');
  } catch (err) {
    console.log(err);
    res.redirect('/assignments');
  }
});

// Show delete page
router.get('/delete/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render('Assignments/delete', {
      title: 'Delete Assignment',
      assignment
    });
  } catch (err) {
    console.log(err);
    res.redirect('/assignments');
  }
});

// Delete assignment
router.post('/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/assignments');
  } catch (err) {
    console.log(err);
    res.redirect('/assignments');
  }
});

module.exports = router;
