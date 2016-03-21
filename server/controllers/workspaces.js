var mongoose = require('mongoose');
var _ = require('lodash');
var Workspace = mongoose.model('Workspace');
var Sheet = mongoose.model('Sheet');


/**
 * List
 */
exports.all = function(req, res) {
  Workspace.find({})
  .then(spaces => res.json(spaces))
  .catch((err) => console.log('Error in first query'));
};

exports.one = function(req, res) {
  Promise.all([
    Workspace.findById(req.params.id),
    Sheet.findOne({ workspace: req.params.id }),
    Sheet.find({ workspace: req.params.id })
  ])
  .then(promiseArr => {
    const sheetNames = promiseArr[2].map(sheet => {
      return { name: sheet.name, id: sheet.id }
    });
    res.json({ space: promiseArr[0], sheet: promiseArr[1], sheetNames });
  })
  .catch(err => res.status(400).send(err));
};

/**
 * Add a Workspace
 */
exports.add = function(req, res) {
  Workspace.create(req.body)
  .then(() => res.status(200).send('OK'))
  .catch(err => res.status(400).send(err))
};

/**
 * Update a Workspace
 */
exports.update = function(req, res) {
    Workspace.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((space) => res.status(200).json(space))
    .catch(err => res.status(500).send('We failed to save to due some reason'))
};

/**
 * Remove a Workspace
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Workspace.findOneAndRemove(query)
  .then(data => res.status(200).send('Removed Successfully'))
  .catch(err => console.log('Error on delete'))
};
