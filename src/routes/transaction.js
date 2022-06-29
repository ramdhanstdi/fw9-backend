const transaction = require('express').Router();

const transactionController = require('../controllers/transaction');

transaction.get('/',transactionController.getListTransaction);
transaction.post('/',transactionController.createListTransaction);
transaction.patch('/:id',transactionController.editListTransaction);
transaction.delete('/:id',transactionController.deleteListTransaction);

module.exports = transaction;