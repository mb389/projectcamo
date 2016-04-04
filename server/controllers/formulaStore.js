var mongoose = require('mongoose');
var _ = require('lodash');
var FormulaStore = mongoose.model('FormulaStore');

/**
 * List
 */
exports.all = function(req, res) {
  FormulaStore.find({})
  .then((formulas) => res.json(formulas))
  .catch((err) => res.status(400).send(err));
};

/**
* Add a Formula to Store
*/
exports.addFormula = function(req, res) {
  FormulaStore.create({
  name: req.body.name,
  functionStr: req.body.functionStr,
  createdBy: req.user.email,
  })
  .then(formula => res.json(formula))
  .catch(err => res.status(400).send(err))
};

/**
 * Remove a Formula from store
 */
exports.removeFormula = function(req, res) {  
   FormulaStore.findByIdAndRemove(req.params.formulaId)
  .then(data => res.status(200).send('Removed Successfully'))
  .catch(err => console.log('Error on delete'))
};


// exports.updateFormula = function(req, res) {
//  // TODO Find by ID or find by name ?  
//   FormulaStore.findByIdAndUpdate(req.params.formulaId, req.body )
//   .then(() => res.sendStatus(200))
//   .catch(() => res.sendStatus(500));
// }

