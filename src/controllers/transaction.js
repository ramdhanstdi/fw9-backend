const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');
const {ListTransactionModels, createTransactionModels, editTransactionModels} = require('../models/transaction');
const errorResponse = require('../helpers/errorResponse');


exports.getListTransaction = (req, res) =>{
  ListTransactionModels((result)=>{
    return response(res, 'List All Transaction', result);
  });
};

exports.createListTransaction = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  createTransactionModels(req.body, (err, result) => {
    return response(res,'Create Transaction', result[0]);
  });
};

exports.editListTransaction = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  editTransactionModels(req.params.id, req.body,(err,result) => {
    if(result.rowCount > 0){
      return response(res,'Editted success', result[0]);
    }else{
      const eres = errorResponse('Transaction not found', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};

exports.deleteListTransaction = (req, res) =>{
  this.deleteListTransaction(req.params.id, result => {
    if(result.rowCount > 0){
      return response(res,'Delete Users', result.rows[0]);
    }else{
      const eres = errorResponse('Users has been deleted', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};