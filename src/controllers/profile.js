const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');
const {ListProfileModels, createProfileModels, editProfileModels,deleteProfile, countProfileListModels} = require('../models/profile');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

exports.getListProfile = (req, res) =>{
  const {tabel='first_name',s='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  ListProfileModels(tabel,s,method,limit,offset, (err, result)=>{
    if(result.rows.length<1){      
      return res.redirect('/404');
    }
    const pageInfo = {};
    countProfileListModels(tabel,s,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',pageInfo,result.rows);
    });
  });
};

exports.createListProfile = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',null,validation.array(), 400);
  }
  createProfileModels(req.body, (err, result) =>{
    if(err){
      return errorResponse(err, res);
    }
    return response(res,'Create Profile Success',null,result[0]);
  });
};

exports.editListProfile = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  editProfileModels(req.params.id, req.body, (err,result) => {
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Profile Success',null,result.rows[0]);
    }
    return  response(res, 'ID not Found',null,null, 400);
  });
};

exports.deleteListProfile = (req, res) =>{
  deleteProfile(req.params.id, result => {
    if(result.rowCount > 0){ //Check ID
      return response(res,'Delete Profile', result.rows[0]);
    }else{
      const eres = errorResponse('Profile has been deleted', 'id');
      return  response(res, 'Error',null,eres, 400);
    }
  });
};