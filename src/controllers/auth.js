const userModels = require('../models/users');
const TransModels = require('../models/transactional');
const ProfileModels = require('../models/profile');
const response = require('../helpers/standarResponse');
const errorResponse = require('../helpers/errorResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {LIMIT_DATA} = process.env;

exports.register = (req,res) => {
  req.body.pin=null;
  TransModels.createTransUser(req.body,(err)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Create Success');
  });
};

exports.createPin = (req,res) =>{
  const {email} = req.body;
  userModels.getUserByEmail(email,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount>0){
      const user = result.rows[0];
      if(user.pin === null){
        userModels.editUserModels(user.id,{pin: req.body.pin},(err,resultUpdate)=>{
          if(err){
            return errorResponse(err,res);
          }
          const userUpdate = resultUpdate.rows[0];
          if(userUpdate.email===user.email){
            return response(res,'Pin Created');
          }
        });
      }else{
        return response(res,'Error: Pin already set');
      }
    }else{
      return response(res, 'Email not Found', null, null, 400);
    }
  });
};

exports.login = (req, res) => {
  const {email, password} = req.body;
  userModels.getUserByEmail(email,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'Email or Password is wrong',null,null,400);
    }
    const user = result.rows[0];
    bcrypt.compare(password,user.password)
      .then((comp)=>{
        if(comp){
          const token = jwt.sign({id: user.id},process.env.APP_KEY||'secret');
          return response(res,'Login Succes', null, token);
        }
        return response(res,'Email or Password is wrong',null,null,400);
      })
      .catch(()=>{
        return response(res,'Email or Password is wrong',null,null,400);
      });
  });
};

exports.getProfile = (req,res) => {
  const userId = req.userAuth.id;
  ProfileModels.getProfileByUserId(userId,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Success show profile', null, result.rows);
  });
};

exports.updateProfile = (req,res) =>{
  const userId = req.userAuth.id;
  let photo = null;
  req.file? photo=req.file.filename:photo=null; 
  ProfileModels.editProfileByUser(userId,req.body,photo,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Success Update',null, result.rows[0]);
  });
};

exports.insertPhoneNum = (req,res) => {
  const userId = req.userAuth.id;
  const photo = null;
  ProfileModels.getProfileByUserId(userId,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      const profile = result.rows[0];
      if(profile.num_phone===null){
        ProfileModels.editProfileByUser(userId,req.body,photo,(err,result)=>{
          if(err){
            return errorResponse(err,res);
          }
          return response(res,'Success Update',null, result.rows[0]);
        });
      }else{
        return response(res,'Number phone already added',null,null,400);
      }
    }
  });
};

exports.changePin = (req,res) => {
  const id = req.userAuth.id;
  const {oldPin,newPin,confirmPin} = req.body;
  userModels.getDetailUser(id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    const user = result.rows[0];
    if(user.pin===oldPin){
      if(newPin===confirmPin){
        const newUser = user;
        newUser.pin = newPin;
        userModels.editUserModels(id,newUser,(err)=>{
          if(err){
            return errorResponse(err,res);
          }
          return response(res, 'Pin Updated');
        });
      }else{
        return response(res,'Confim Pin not match',null,null,400);
      }
    }else{
      return response(res, 'Wrong Pin',null,null,400);
    }
  });
};

exports.changePass = (req,res) => {
  const id = req.userAuth.id;
  const {oldPass, newPass, confirmPass}= req.body;
  userModels.getDetailUser(id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    const user = result.rows[0];
    bcrypt.compare(oldPass,user.password)
      .then((pass)=>{
        if(pass){
          if(newPass===confirmPass){
            bcrypt.hash(newPass,10,(err,hash)=>{
              user.password=hash;
              userModels.editUserModels(id,user,(err)=>{
                if (err) {
                  return response (res,'Failed to change password',null,null,500);
                }
                return response(res,'Password changed');
              });
            });
          }else{
            return response(res,'Confirm new password does not match', null, null, 400);
          }
        }else{
          return response(res,'Wrong Password',null,null,400);
        }
      })
      .catch(()=>{
        return response(res,'Wrong Password',null,null,400);
      });
  });
};

exports.transferToOthers = (req,res) => {
  const senderid = req.userAuth.id;
  userModels.getDetailUser(senderid,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      const user = result.rows[0];
      ProfileModels.getProfileByUserId(senderid,(err,resultProfile)=>{
        if (err) {
          return errorResponse(err,res);
        }else{
          const profile = resultProfile.rows[0];
          const amount = parseInt(req.body.amount); 
          const balance = parseInt(profile.balance); 
          if(amount > balance){
            return response(res,'Balance not enough',null, null,400);
          }else{
            if(user.pin===req.body.pin){
              TransModels.transferToOthers(senderid,req.body,(err,result)=>{
                if (err) {
                  return errorResponse(err,res);
                }
                return response(res,`Transfer Success, Balance left is ${balance - amount}`,null,result.rows[0]);
              });
            }else{
              return response(res,'Wrong Pin',null, null,400);
            }
          }
        }
      });
    }
  });
};

exports.historyTransaction = (req,res) => {
  const id = req.userAuth.id;
  const {searchBy='notes',search='',sortBy='time_transfer',sort='DESC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
  TransModels.historyTransaction(id,searchBy,search,sortBy,sort,limit,offset,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    const pageInfo = {};
    TransModels.countHistory(id,searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'Showing History', pageInfo, result.rows);
    });
  });
};

exports.topUpUsers = (req,res) =>{
  const id = req.userAuth.id;
  TransModels.topUp(id,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Top Up Success',null,result.rows[0]);
  });
};

exports.updateNumber = (req,res) =>{
  const userId = req.userAuth.id;
  const photo = null;
  ProfileModels.getProfileByUserId(userId,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      const profile = result.rows[0];
      if(profile.num_phone===null){
        return response(res,'Add Number First',null,null,400);
      }else{
        ProfileModels.editProfileByUser(userId,req.body,photo,(err,result)=>{
          if(err){
            return errorResponse(err,res);
          }
          return response(res,'Success Updated Number',null, result.rows[0]);
        });
      }
    }
  });
};