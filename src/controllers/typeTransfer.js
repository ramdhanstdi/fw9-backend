const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const {ListTypeTransferModels, createTypeTransferModels, editTypeTransferModels,deleteTypeTransferModels} = require('../models/typeTransaction');

exports.getAllTypeTransfer =(req,res) => {
  ListTypeTransferModels((result)=>{
    return response(res, 'List All Type Transfer', result);
  });
};

exports.createTypeTransfer = (req,res) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res,'Error',validation.array(),400);
  }
  createTypeTransferModels(req.body,(err, result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res, 'Create Successfull', result[0]);
    }
  });
};

exports.editTypeTransfer = (req,res) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error', validation.array(),400);
  }
  editTypeTransferModels(req.params.id, req.body,(err, result)=>{
    console.log(result);
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Successfull', result.rows[0]);
    }
    return  response(res, 'ID not Found', null, 400);
  });
};

exports.deleteTypeTransfer = (req,res) =>{
  deleteTypeTransferModels(req.params.id, (result)=>{
    if(result.rowCount>0){
      return response(res, 'Delete Successfull', result.rows[0]);
    }else{
      return response(res, 'ID not Found', null, 400);
    }
  });
};