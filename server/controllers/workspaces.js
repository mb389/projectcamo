var mongoose = require('mongoose');
var _ = require('lodash');
var Workspace = mongoose.model('Workspace');
var Sheet = mongoose.model('Sheet');




/**
 * List
 */
exports.all = function(req, res) {
  Promise.all([
    Workspace.find({user: req.user._id}),
    Workspace.find({collabs: req.user._id})
  ])
  .then(spaces => res.json({spaces: spaces[0], collabSpaces: spaces[1]}))
  .catch((err) => console.log('Error in first query'));
};


exports.findCollab = function(req, res) {
  Workspace.find({collabs:req.user._id})
  .then((spaces) => res.json(spaces))
  .catch(err => res.status(400).send(err))
}

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

    res.json({ space: promiseArr[0], sheet: promiseArr[1], sheetNames, sheets: promiseArr[2] });
  })
  .catch(err => res.status(400).send(err));
};


/**
 * Add a Workspace
 */
 // TODO NEEDS A USER ATTACHED
exports.add = function(req, res) {
  var spaceToSend;
  Workspace.create({name: `NewSpace${req.body.spaceCount}`, user:req.user._id})
  .then((space) => {
    spaceToSend = space;
    return Sheet.create({
      name: 'Sheet1',
      workspace: space._id
    })
  })
  .then(sheet => {
    res.json({
      space: spaceToSend,
      sheet
    })
  })
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
