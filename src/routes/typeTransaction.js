const typeTransaction = require('express').Router();
const {body} = require('express-validator');
const typeTransactionControler = require('../controllers/typeTransfer');

const validator = [
  body('name').isLength({min:1}).withMessage('Name cant be Empty')];

typeTransaction.get('/',typeTransactionControler.getAllTypeTransfer);
typeTransaction.post('/',...validator,typeTransactionControler.createTypeTransfer);
typeTransaction.patch('/:id',...validator,typeTransactionControler.editTypeTransfer);
typeTransaction.delete('/:id',typeTransactionControler.deleteTypeTransfer);

module.exports = typeTransaction;