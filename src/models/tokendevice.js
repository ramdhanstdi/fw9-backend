const db = require('../helpers/db');

exports.saveTokenModel = (data, cb) => {
  const que = 'INSERT INTO token (token, user_id) VALUES ($1,$2) RETURNING*';
  const val = [data.token, data.user_id];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    } else {
      cb(err,res);
    }
  });
};

exports.getTokenModel = (id,cb) => {
  const que = `SELECT * FROM token WHERE user_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.checkTokenModel = (token,cb) => {
  const que = `SELECT * FROM token WHERE token=${token}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.editToken = (token, data, cb) => {
  let value = [token];
  const filtered = {};
  const obj = {
    user_id: data.user_id? data.user_id:null,
    token: data.token,
  };
  for(let i in obj){
    filtered[i]=obj[i];
    value.push(obj[i]);
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+2}`);
  const que = `UPDATE token SET ${resulting} WHERE token=$1 RETURNING*`;
  db.query(que,value,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.deleteTokenModel = (id,cb)=>{
  const que = `DELETE FROM token WHERE user_id=${id} RETURNING*`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};