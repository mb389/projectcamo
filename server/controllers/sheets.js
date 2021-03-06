const mongoose = require('mongoose');
const Sheet = mongoose.model('Sheet');


/**
 * List
 */
exports.all = (req, res) => {
  Sheet.find({})
    .then(() => res.json(Sheets))
    .catch(err => res.status(400).send(err));
};

/**
 * Find a Sheet?
 */
exports.one = (req, res) => {
  Sheet.findById(req.params.sheetId)
    .then(sheet => res.json(sheet))
    .catch(err => res.status(400).send(err));
};

 /**
  * Add a Sheet
  */
exports.addSheetToSpace = (req, res) => {
  Sheet.create({
    name: 'Sheet Name',
    workspace: req.params.spaceId,
    content: {
      grid: req.body.grid || [],
      columnHeaders: req.body.columnHeaders || [{ id: '100', type: 'ID', name: 'Record Name', idx: 0, width: 200 }]
    }
  })
    .then(sheet => res.json(sheet))
    .catch(err => res.status(400).send(err));
};

/**
 * Update/Save a Sheet
 */
exports.update = (req, res) => {
  const data = {
    content: req.body.sheet,
  };
  if (req.body.commit) data.$push = { 'history': { columnHeaders: req.body.sheet.columnHeaders, grid: req.body.sheet.grid } };
  Sheet.findByIdAndUpdate(req.params.id, data, { new: true })
    .then(sheet => res.status(200).json(sheet))
    .catch(() => res.status(500).send('We failed to save to due some reason'));
};

exports.updateName = (req, res) => {
  Sheet.findByIdAndUpdate(req.params.sheetId, req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
};

/**
 * Remove a Sheet
 */
exports.remove = (req, res) => {
  Sheet.remove({ _id: req.params.id })
    .then(() => res.status(200).send('Removed Successfully'))
    .catch(() => console.log('Error on delete'));
};
