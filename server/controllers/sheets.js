var mongoose = require('mongoose');
var _ = require('lodash');
var Sheet = mongoose.model('Sheet');


/**
 * List
 */
exports.all = function(req, res) {
  Sheet.find({})
  .then(() => res.json(Sheets))
  .catch((err) => console.log('Error in first query'));  
};

/**
 * Add a Sheet
 */
exports.add = function(req, res) {
  Sheet.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};

/**
 * Update a Sheet
 */
exports.update = function(req, res) {
  var query = { id: req.params.id };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _.omit(req.body, omitKeys);

  if(isFull) {
    Sheet.findOneAndUpdate(query, data, function(err, data) {
      if(err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  } else {
    Sheet.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1: -1 } }, function(err, data) {
      if(err) {
        console.log('Error on save!');
        // Not sure if server status is the correct status to return
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  }

};

/**
 * Remove a Sheet
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Sheet.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};
