var mongoose = require('mongoose');
var _ = require('lodash');
var Workspace = mongoose.model('Workspace');


/**
 * List
 */
exports.all = function(req, res) {
  Workspace.find({})
  .then(() => res.json(Workspaces))
  .catch((err) => console.log('Error in first query'));
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
  var query = { id: req.params.id };

    Workspace.findOneAndUpdate(query, data)
    .then(() => res.status(200).send('Updated successfully'))
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
