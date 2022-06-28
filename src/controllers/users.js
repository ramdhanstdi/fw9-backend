const response = require('../helpers/standarResponse');
const usersModels = require('../models/users');

exports.getAllUser = (req, res) =>{
  usersModels.getAllUser((result)=>{
    return response(res,'User show',result);
  });
};

exports.createListUsers = (req, res) =>{
  return response(res,'Create Users');
};

exports.editListUsers = (req, res) =>{
  return response(res,'Edit All Users');
};

exports.deleteListUsers = (req, res) =>{
  return response(res,'Delete Users');
};