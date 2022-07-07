const response = require('../helpers/standarResponse');
const {ListUserModels, createUserModels, editUserModels, deleteUser, countUserListModels, getDetailUser} = require('../models/users');
const {validationResult} = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

exports.getAllUser = (req, res) =>{
  const {searchBy='username',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  ListUserModels(searchBy,search,method,limit,offset, (err, result)=>{
    if(result.rows.length<1){      
      return res.redirect('/404');
    }
    const pageInfo = {};
    countUserListModels(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',pageInfo,result.rows);
    });
  });
};

exports.getDetailUser = (req,res)=>{
  const getId = req.params.id;  
  if(getId){
    getDetailUser(getId,(err,result)=>{
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

exports.createListUsers = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',null,validation.array(), 400);
  }
  createUserModels(req.body, (err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Create Users Success', null,result);
    }
  });
};

exports.editListUsers = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',null,validation.array(), 400);
  }
  editUserModels(req.params.id, req.body,(err, result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Users Success',null,result.rows[0]);
    }
    return  response(res, 'ID not Found',null,null, 400);
  });
};

exports.deleteListUsers = (req, res) =>{
  deleteUser(req.params.id, (err,result)=>{
    if(err){
      errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Delete Users Success',null,result.rows[0]);
    }else{
      return  response(res, 'ID not Found or Deleted',null,null, 400);
    }
  });
};