const response = require('../helpers/standarResponse');
const {ListTransactionModels, createTransactionModels} = require('../models/transaction');

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
  return response(res,'Edit All Transaction');
};

exports.deleteListTransaction = (req, res) =>{
  return response(res,'Delete Transaction');
};