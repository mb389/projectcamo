var mongoose = require('mongoose');
var _ = require('lodash');
var Sheet = mongoose.model('Sheet');


/**
 * List
 */
exports.all = function(req, res) {
  Sheet.find({})
  .then(() => res.json(Sheets))
  .catch((err) => res.status(400).send(err));
};

/**
 * Add a Sheet
 */
 exports.one = function(req, res) {
   Sheet.findOne({
     name: req.params.sheetName,
     workspace: req.params.spaceId
   })
   .then(sheet => res.json(sheet))
   .catch(err => res.status(400).send(err));
 };

/**
 * Add a Sheet
 */
exports.add = function(req, res) {
  Sheet.create(req.body)
  .then(() => res.status(200).send('OK'))
  .catch(err => res.status(400).send(err))
};

/**
 * Update a Sheet
 */
exports.update = function(req, res) {
  var query = { id: req.params.id };

    Sheet.findOneAndUpdate(query, data)
    .then(() => res.status(200).send('Updated successfully'))
    .catch(err => res.status(500).send('We failed to save to due some reason'))
};

/**
 * Remove a Sheet
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Sheet.findOneAndRemove(query)
  .then(data => res.status(200).send('Removed Successfully'))
  .catch(err => console.log('Error on delete'))
};
