const response = require('../helpers/standarResponse');
const {ListTransactionModels, createTransactionModels, editTransactionModels} = require('../models/transaction');

exports.getListTransaction = (req, res) =>{
  ListTransactionModels((result)=>{
    return response(res, 'List All Transaction', result);
  });
};

exports.createListTransaction = (req, res) =>{
  createTransactionModels(req.body, result => {
    return response(res,'Create Transaction', result[0]);
  });
};

exports.editListTransaction = (req, res) =>{
  editTransactionModels(req.params.id, req.body, result => {
    return response(res,'Edit Transaction done', result[0]);
  });
};

exports.deleteListTransaction = (req, res) =>{
  return response(res,'Delete Transaction');
};