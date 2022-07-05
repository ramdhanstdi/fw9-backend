const typeTransaction = require('express').Router();
const {body} = require('express-validator');
const typeTransactionControler = require('../controllers/typeTransfer');

const validator = [
  body('name').isLength({min:1}).withMessage('Name cant be Empty')];

typeTransaction.get('/',typeTransactionControler.getAllTypeTransaction);
typeTransaction.post('/',...validator,typeTransactionControler.createTypeTransaction);
typeTransaction.patch('/:id',...validator,typeTransactionControler.editTypeTransaction);
typeTransaction.delete('/:id',typeTransactionControler.deleteTypeTransaction);

module.exports = typeTransaction;