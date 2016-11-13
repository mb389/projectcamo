/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  functionStr: {type: String, required: true},
  createdBy: String,
  creationDate: { type: Date, default: Date.now },
});

FormulaStore = mongoose.model('FormulaStore', schema);
