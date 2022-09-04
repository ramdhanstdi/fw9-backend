const response = require('../helpers/standarResponse');
const {ListProfileModels, createProfileModels, editProfileModels,deleteProfile, countProfileListModels, getDetailProfile} = require('../models/profile');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

//Access Profile
exports.getListProfile = (req, res) =>{
  const {searchBy='num_phone',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  ListProfileModels(searchBy,search,method,limit,offset, (err, result)=>{
    if(err){
      return errorResponse (err,res);
    }
    if(result.rowCount<1){      
      return res.redirect('/404');
    }
    const pageInfo = {};
    countProfileListModels(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',pageInfo,result.rows);
    });
  });
};

exports.getDetailProfile = (req,res)=>{
  const getId = req.params.id;  
  if(getId){
    getDetailProfile(getId,(err,result)=>{
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


//Create Profile
exports.createListProfile = (req, res) =>{
  let photo = null;
  req.file===undefined? photo=null:photo=req.file.filename;
  createProfileModels(req.body,photo,(err, result) =>{
    if(err){
      return errorResponse(err, res);
    }
    return response(res,'Create Profile Success',null,result[0]);
  });
};

//Edit Profile
exports.editListProfile = (req, res) =>{
  let photo = null;
  req.file? photo=req.file.filename:photo = null;
  editProfileModels(req.params.id,req.body,photo,(err,result) => {
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit Profile Success',null,result.rows[0]);
    }
    return  response(res, 'ID not Found',null,null, 400);
  });
};


//Delete Profile
exports.deleteListProfile = (req, res) =>{
  deleteProfile(req.params.id,(err,result) => {
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){ 
      return response(res,'Delete Profile', result.rows[0]);
    }else{
      const eres = errorResponse('Profile has been deleted', 'id');
      return  response(res, 'Error',null,eres, 400);
    }
  });
};