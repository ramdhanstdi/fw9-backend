const response = require('../helpers/standarResponse');
const {ListUserModels, createUserModels, editUserModels, deleteUser} = require('../models/users');
const {validationResult} = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

exports.getAllUser = (req, res) =>{
  ListUserModels((result)=>{
    return response(res,'User show',result);
  });
};

exports.createListUsers = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  createUserModels(req.body, (err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Create Users Success', result);
    }
  });
};

exports.editListUsers = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  editUserModels(req.params.id, req.body,(err, result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Users Success', result.rows[0]);
    }
    return  response(res, 'ID not Found', null, 400);
  });
};

exports.deleteListUsers = (req, res) =>{
  deleteUser(req.params.id, result=>{
    if(result.rowCount > 0){
      return response(res,'Delete Users', result.rows[0]);
    }else{
      return  response(res, 'ID not Found', null, 400);
    }
  });
};