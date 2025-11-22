const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "Pending" },
  description: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
