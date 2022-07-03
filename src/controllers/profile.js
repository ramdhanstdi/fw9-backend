const response = require('../helpers/standarResponse');
const {validationResult} = require('express-validator');
const {ListProfileModels, createProfileModels, editProfileModels,deleteProfile} = require('../models/profile');
const errorResponse = require('../helpers/errorResponse');

exports.getListProfile = (req, res) =>{
  ListProfileModels((result)=>{
    return response(res,'List All Profile', result);
  });
};

exports.createListProfile = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  createProfileModels(req.body, (err, result) =>{
    if(err){
      return errorResponse(err, res);
    }
    return response(res,'Create Profile Success',result[0]);
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
      return response(res,'Edit Profile Success', result.rows[0]);
    }
    return  response(res, 'ID not Found', null, 400);
  });
};

exports.deleteListProfile = (req, res) =>{
  deleteProfile(req.params.id, result => {
    if(result.rowCount > 0){ //Check ID
      return response(res,'Delete Profile', result.rows[0]);
    }else{
      const eres = errorResponse('Profile has been deleted', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};