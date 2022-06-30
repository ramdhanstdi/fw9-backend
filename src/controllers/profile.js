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
    if(err.code==='23505'&&err.detail.includes('num_phone')){
      const eres = errorResponse('Number Phone already used', 'num_phone');
      return response(res, 'Error', eres, 400);
    }else{
      return response(res,'Create Profile Success',result[0]);
    }
  });
};

exports.editListProfile = (req, res) =>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured', validation.array(), 400);
  }
  editProfileModels(req.params.id, req.body, (err,result) => {
    if(result.rowCount > 0){
      if(err.code==='23505'&&err.detail.includes('num_phone')){
        const eres = errorResponse('Number Phone already used', 'num_phone');
        return response(res, 'Error', eres, 400);
      }else{
        return response(res,'Edit Profile Success', result[0]);
      }
    }else{
      const eres = errorResponse('Profile not found', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};

exports.deleteListProfile = (req, res) =>{
  deleteProfile(req.params.id, result => {
    if(result.rowCount > 0){
      return response(res,'Delete Profile', result[0]);
    }else{
      const eres = errorResponse('Profile has been deleted', 'id');
      return  response(res, 'Error', eres, 400);
    }
  });
};