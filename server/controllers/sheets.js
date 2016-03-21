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
  Sheet.findById(req.params.sheetId)
  .then(sheet => res.json(sheet))
  .catch(err => res.status(400).send(err));
 };

 /**
  * Add a Sheet
  */
 exports.addSheetToSpace = function(req, res) {
   Sheet.create({name: 'Sheet Name', workspace: req.params.spaceId})
   .then(sheet => res.json(sheet))
   .catch(err => res.status(400).send(err))
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
  Sheet.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.status(200).send('Updated successfully'))
  .catch(() => res.status(500).send('We failed to save to due some reason'))
};

exports.updateName = function(req, res) {
  console.log('run')
  console.log(req.body);
  Sheet.findOneAndUpdate({
    name: req.params.sheetName,
    workspace: req.params.spaceId
  }, req.body )
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));
}

/**
 * Remove a Sheet
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Sheet.findOneAndRemove(query)
  .then(data => res.status(200).send('Removed Successfully'))
  .catch(err => console.log('Error on delete'))
};
