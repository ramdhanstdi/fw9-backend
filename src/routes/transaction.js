const transaction = require('express').Router();
const validation = require('../middleware/validation');
const {rulesTransaction} = require('./validator');
const transactionController = require('../controllers/transaction');


transaction.get('/:id',transactionController.getDetailTransaction);
transaction.get('/',transactionController.getListTransaction);
transaction.post('/',...rulesTransaction,validation,transactionController.createListTransaction);
transaction.patch('/:id',...rulesTransaction,validation,transactionController.editListTransaction);
transaction.delete('/:id',transactionController.deleteListTransaction);

module.exports = transaction;