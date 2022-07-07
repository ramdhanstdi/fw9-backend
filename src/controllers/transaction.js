const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');
const {ListTransactionModels, createTransactionModels, editTransactionModels, countTransactionListModels, getDetailTransaction} = require('../models/transaction');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

exports.getListTransaction = (req, res) =>{
  const {searchBy='notes',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  ListTransactionModels(searchBy,search,method,limit,offset, (err, result)=>{
    if(result.rows.length<1){      
      return res.redirect('/404');
    }
    const pageInfo = {};
    countTransactionListModels(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',pageInfo,result.rows);
    });
  });
};

exports.getDetailTransaction = (req,res)=>{
  const getId = req.params.id;  
  if(getId){
    getDetailTransaction(getId,(err,result)=>{
      console.log(result);
      if(err){
        return errorResponse(err,res);
      }
      if(result.rowCount > 0){
        return response(res,'Detail Users',null,result.rows[0]);
      }else{
        return response(res,'ID not Found',null,null, 400);
      }
    });
  }
};

exports.createListTransaction = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',null,validation.array(), 400);
  }
  createTransactionModels(req.body, (err, result) => {
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Create Transaction',null,result.rows[0]);
  });
};

exports.editListTransaction = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  editTransactionModels(req.params.id, req.body,(err,result) => {
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Editted success', result[0]);
    }else{
      const eres = errorResponse('Transaction not found', 'id');
      return  response(res, 'Error',null, eres, 400);
    }
  });
};

exports.deleteListTransaction = (req, res) =>{
  this.deleteListTransaction(req.params.id,(err,result) => {
    if(err){
      return errorResponse(err, res);
    }
    if(result.rowCount > 0){
      return response(res,'Delete Users', result.rows[0]);
    }else{
      const eres = errorResponse('Users has been deleted', 'id');
      return  response(res, 'Error',null,eres, 400);
    }
  });
};