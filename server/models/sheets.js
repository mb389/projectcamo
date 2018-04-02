/**
 * Schema Definitions
 *
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    columnHeaders: {
      type: Array,
      default: [{id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200}],
    },
    grid: {type: Array, default: []},
  },
  history: [
    {
      columnHeaders: Array,
      grid: Array,
      saveDate: {type: Date, default: Date.now},
    },
  ],
  name: {
    type: String,
    required: true,
  },
  creationDate: {type: Date, default: Date.now},
  workspace: {type: mongoose.Schema.Types.ObjectId, ref: 'Workspace'},
});

Sheet = mongoose.model('Sheet', schema);

const columnHeaders = [{id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200}];

// const grid = [];
// const sheetState = {
//   grid,
//   columnHeaders,
//   showRowModal: false,
//   modalRow: { data: null, rowIdx: null }
// };
