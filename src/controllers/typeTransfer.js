const response = require('../helpers/standarResponse');
const errorResponse = require('../helpers/errorResponse');
const {ListTypeTransactionModels, countTypeTransactionModels, createTypeTransactionModels, editTypeTransactionModels, deleteTypeTransactionModels, getDetailTypeTransaction} = require('../models/typeTransaction');
const {LIMIT_DATA} = process.env;

exports.getAllTypeTransaction =(req, res) =>{
  const {searchBy='name',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  ListTypeTransactionModels(searchBy,search,method,limit,offset, (err, result)=>{
    if(result.rows.length<1){      
      return res.redirect('/404');
    }
    const pageInfo = {};
    countTypeTransactionModels(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',pageInfo,result.rows);
    });
  });
};

exports.getDetailTypeTransaction = (req,res)=>{
  const getId = req.params.id;  
  if(getId){
    getDetailTypeTransaction(getId,(err,result)=>{
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

exports.createTypeTransaction = (req,res) => {
  createTypeTransactionModels(req.body,(err, result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res, 'Create Successfull', null,result[0]);
    }
  });
};

exports.editTypeTransaction = (req,res) => {
  editTypeTransactionModels(req.params.id, req.body,(err, result)=>{
    console.log(result);
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Successfull',null,result.rows[0]);
    }
    return  response(res, 'ID not Found', null,null, 400);
  });
};

exports.deleteTypeTransaction = (req,res) =>{
  deleteTypeTransactionModels(req.params.id, (err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount>0){
      return response(res, 'Delete Successfull',null,result.rows[0]);
    }else{
      return response(res, 'ID not Found', null,null, 400);
    }
  });
};