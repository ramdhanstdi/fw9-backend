const typeTransaction = require('express').Router();
const validation = require('../middleware/validation');
const {rulesTypeTransaction} = require('./validator');
const typeTransactionControler = require('../controllers/typeTransfer');


typeTransaction.get('/:id',typeTransactionControler.getDetailTypeTransaction);
typeTransaction.get('/',typeTransactionControler.getAllTypeTransaction);
typeTransaction.post('/',...rulesTypeTransaction,validation,typeTransactionControler.createTypeTransaction);
typeTransaction.patch('/:id',...rulesTypeTransaction,validation,typeTransactionControler.editTypeTransaction);
typeTransaction.delete('/:id',typeTransactionControler.deleteTypeTransaction);

module.exports = typeTransaction;