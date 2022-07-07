const typeTransaction = require('express').Router();
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const typeTransactionControler = require('../controllers/typeTransfer');

const validator = [
  body('name').isLength({min:1}).withMessage('Name cant be Empty'),
  body('description').optional({ checkFalsy: true }).escape()
];

typeTransaction.get('/:id',typeTransactionControler.getDetailTypeTransaction);
typeTransaction.get('/',typeTransactionControler.getAllTypeTransaction);
typeTransaction.post('/',...validator,validation,typeTransactionControler.createTypeTransaction);
typeTransaction.patch('/:id',...validator,validation,typeTransactionControler.editTypeTransaction);
typeTransaction.delete('/:id',typeTransactionControler.deleteTypeTransaction);

module.exports = typeTransaction;