/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  content: {
    columnHeaders: Array,
    grid: Array
  },
  history: [{
    columnHeaders: Array,
    grid: Array,
    saveDate: { type: Date, default: Date.now }
  }],
  name: {
    type: String,
    required: true
  },
  creationDate: { type: Date, default: Date.now },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
});

Sheet = mongoose.model('Sheet', schema);
