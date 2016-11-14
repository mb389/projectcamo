/**
 * Schema Definitions
 *
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collabs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
Workspace = mongoose.model('Workspace', schema);
