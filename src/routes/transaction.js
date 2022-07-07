const transaction = require('express').Router();
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const transactionController = require('../controllers/transaction');

const validator = [
  body('receiver_id').isLength({min:1}).withMessage('Receiver can\'t be empty'),
  body('amount').isInt({min:1}).withMessage('Input only positive number')
    .isLength({min:1}).withMessage('Amount can\'t be empty'),
  body('transfertype').isLength({min:1}).withMessage('Transfer type can\'t be empty'),
  body('time_transfer').isISO8601().withMessage('Time Transfer in Valid')
];

transaction.get('/:id',transactionController.getDetailTransaction);
transaction.get('/',transactionController.getListTransaction);
transaction.post('/',...validator,validation,transactionController.createListTransaction);
transaction.patch('/:id',...validator,validation,transactionController.editListTransaction);
transaction.delete('/:id',transactionController.deleteListTransaction);

module.exports = transaction;