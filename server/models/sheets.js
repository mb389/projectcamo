/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  content: Object,
  history: [{
    columnHeaders: Array,
    grid: Array
  }],
  name: {
    type: String,
    required: true
  },
  creationDate: { type: Date, default: Date.now },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
});

Sheet = mongoose.model('Sheet', schema);
