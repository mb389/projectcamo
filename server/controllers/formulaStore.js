const mongoose = require('mongoose');
const FormulaStore = mongoose.model('FormulaStore');

/**
 * List
 */
exports.all = function (req, res) {
  FormulaStore.find({})
  .then((formulas) => res.json(formulas))
  .catch((err) => res.status(400).send(err));
};

/**
* Add a Formula to Store
*/
exports.addFormula = function (req, res) {
  FormulaStore.create({
    name: req.body.name,
    functionStr: req.body.functionStr,
    createdBy: req.user.email,
  })
  .then(formula => res.json(formula))
  .catch(err => res.status(400).send(err));
};

/**
 * Remove a Formula from store
 */
exports.removeFormula = function (req, res) {
  FormulaStore.findByIdAndRemove(req.params.formulaId)
    .then(() => res.status(200).send('Removed Successfully'))
    .catch(() => console.log('Error on delete'));
};
