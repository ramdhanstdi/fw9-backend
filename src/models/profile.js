const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.ListProfileModels = (searchBy, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) => {
  const que = `SELECT * FROM profile WHERE num_phone ILIKE '%${keyword}%' OR first_name ILIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countProfileListModels = (searchBy, keyword, cb) =>{
  const que = `SELECT * FROM profile WHERE ${searchBy} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.getDetailProfile = (id,cb) => {
  db.query(`SELECT * FROM profile WHERE id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.getProfileByUserId = (id,cb) => {
  db.query(`SELECT profile_photo,first_name,last_name,num_phone,balance,users.email FROM profile JOIN users ON users.id=profile.user_id WHERE user_id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.createProfileModels = (data,picture,cb) =>{
  let value = [];
  const filtered = {};
  const obj = {
    first_name: data.first_name,
    last_name: data.last_name,
    num_phone: data.num_phone,
    balance: data.balance,
    user_id: data.user_id,
    profile_photo: picture
  };
  for(let i in obj){
    if(obj[i]!==null){
      filtered[i]=obj[i];
      value.push(obj[i]);
    }
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+1}`);
  const que = `UPDATE profile SET ${resulting}RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

//Admin Access
exports.editProfileModels = (id, data,picture, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    first_name: data.first_name,
    last_name: data.last_name,
    num_phone: data.num_phone,
    balance: data.balance,
    user_id: data.user_id,
    profile_photo: picture
  };
  for(let i in obj){
    if(obj[i]!==null){
      if(obj[i]!==undefined){
        filtered[i]=obj[i];
        value.push(obj[i]);
      }
    }
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+2}`);
  const que = `UPDATE profile SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.editProfileByUser = (id, data, picture, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    first_name: data.first_name,
    last_name: data.last_name,
    num_phone: data.num_phone,
    balance: data.balance,
    profile_photo: picture
  };
  for(let i in obj){
    if(obj[i]!==null){
      if(obj[i]!==undefined){
        filtered[i]=obj[i];
        value.push(obj[i]);
      }
    }
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+2}`);
  const que = `UPDATE profile SET ${resulting} WHERE user_id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteProfile = (id, cb) =>{
  const que = 'DELETE FROM profile WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};