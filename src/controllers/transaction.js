const response = require('../helpers/standarResponse');
const {ListTransactionModels, createTransactionModels, editTransactionModels} = require('../models/transaction');
const errorResponse = require('../helpers/errorResponse');


exports.getListTransaction = (req, res) =>{
  ListTransactionModels((result)=>{
    return response(res, 'List All Transaction', result);
  });
};

exports.createListTransaction = (req, res) =>{
  createTransactionModels(req.body, (err, result) => {
    console.log(err);
    return response(res,'Create Transaction', result[0]);
  });
};

exports.editListTransaction = (req, res) =>{
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
      return response(res,'Delete Users', result[0]);
    }else{
      const eres = errorResponse('Users has been deleted', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};