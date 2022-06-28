const response = require('../helpers/standarResponse');

exports.getListTransaction = (req, res) =>{
  return response(res, 'List All Transaction');
};

exports.createListTransaction = (req, res) =>{
  return response(res,'Create Transaction');
};

exports.editListTransaction = (req, res) =>{
  return response(res,'Edit All Transaction');
};

exports.deleteListTransaction = (req, res) =>{
  return response(res,'Delete Transaction');
};