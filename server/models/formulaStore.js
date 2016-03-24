/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  functionStr: String,
  createdBy: String,
  creationDate: { type: Date, default: Date.now },
});

FormulaStore = mongoose.model('FormulaStore', schema);
