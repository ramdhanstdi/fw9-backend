const { saveTokenModel, getTokenModel, editToken, deleteTokenModel, checkTokenModel } = require('../models/tokendevice');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standarResponse');

exports.saveToken = (req,res) => {
  saveTokenModel(req.body, (err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Token Saved', null, result.rows[0]);
  });
};

exports.getToken = (req,res) => {
  getTokenModel(req.params.userid,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    console.log(result);
    return response(res,'Token Get', null, result.rows[0]);
  });
};

exports.checkToken = (req,res) => {
  checkTokenModel(req.params.token,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    return response(res,'Token Get', null, result.rows[0]);
  });
};

exports.editToken = (req,res) => {
  editToken(req.params.token,req.body,(err,result)=>{
    console.log(req.body);
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    if(result.rowCount < 1){
      return response(res, 'TOKEN not Found or DELETED', null, null, 400);
    }
    return response(res,'Token has been edited',null, result.rows[0]);
  });
};

exports.deleteToken = (req, res) => {
  deleteTokenModel(req.body.user_id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount < 1){
      return response(res, 'TOKEN not Found or DELETED', null, null, 400);
    }
    return response(res,'Token has been Deleted');
  });
};