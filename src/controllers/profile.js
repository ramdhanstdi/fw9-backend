const response = require('../helpers/standarResponse');
const {ListProfileModels, createProfileModels, editProfileModels,deleteProfile} = require('../models/profile');

exports.getListProfile = (req, res) =>{
  ListProfileModels((result)=>{
    return response(res,'List All Profile', result);
  });
};

exports.createListProfile = (req, res) =>{
  createProfileModels(req.body, result =>{
    return response(res,'Create Profile',result[0]);
  });
};

exports.editListProfile = (req, res) =>{
  editProfileModels(req.params.id, req.body, result => {
    return response(res,'Edit All Profile', result[0]);
  });
};

exports.deleteListProfile = (req, res) =>{
  deleteProfile(req.params.id, result => {
    return response(res,'Delete Profile', result[0]);
  });
};