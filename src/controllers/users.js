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
      if(err.code==='23505'&&err.detail.includes('email')){
        const eres = errorResponse('Email already exist', 'email');
        return response(res, 'Error', eres, 400);
      }else if(err.code==='23505'&&err.detail.includes('username')){
        const eres = errorResponse('Username already exist', 'username');
        return response(res, 'Error', eres, 400);
      }
    }else{
      return response(res,'Create Users Success', result[0]);
    }
  });
};

exports.editListUsers = (req, res) =>{
  editUserModels(req.params.id, req.body, result=>{
    return response(res,'Edit All Users', result[0]);
  });
};

exports.deleteListUsers = (req, res) =>{
  deleteUser(req.params.id, result=>{
    return response(res,'Delete Users', result[0]);
  });
};