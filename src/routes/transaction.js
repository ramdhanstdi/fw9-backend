const transaction = require('express').Router();
const {body} = require('express-validator');
const transactionController = require('../controllers/transaction');

const validator = [
  body('receiver_id').isLength({min:1}).withMessage('Receiver can\'t be empty'),
  body('amount').isInt({min:1}).withMessage('Input only positive number')
    .isLength({min:1}).withMessage('Amount can\'t be empty'),
  body('transfertype').isLength({min:1}).withMessage('Transfer type can\'t be empty'),
  body('time_transfer').isLength({min:1}).withMessage('Time Transfer can\'t be empty')
];


transaction.get('/',transactionController.getListTransaction);
transaction.post('/',...validator,transactionController.createListTransaction);
transaction.patch('/:id',...validator,transactionController.editListTransaction);
transaction.delete('/:id',transactionController.deleteListTransaction);

module.exports = transaction;