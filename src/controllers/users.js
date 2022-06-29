const response = require('../helpers/standarResponse');
const {ListUserModels, createUserModels, editUserModels, deleteUser} = require('../models/users');

exports.getAllUser = (req, res) =>{
  ListUserModels((result)=>{
    return response(res,'User show',result);
  });
};

exports.createListUsers = (req, res) =>{
  createUserModels(req.body, result=>{
    return response(res,'Create Users Success', result[0]);
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