const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.ListUserModels = (searchBy, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) => {
  const que = `SELECT * FROM users WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countUserListModels = (searchBy, keyword, cb) =>{
  const que = `SELECT * FROM users WHERE ${searchBy} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.getDetailUser = (id,cb) => {
  db.query(`SELECT * FROM users WHERE id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.getUserByEmail = (email,cb) => {
  const que ='SELECT * FROM users WHERE email=$1';
  const value = [email];
  db.query(que,value,(err,res)=>{
    console.log(err);
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};


exports.createUserModels = (data, cb) =>{
  const que = 'INSERT INTO users (username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING*';
  const value = [data.username, data.email, data.password, data.pin];
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.editUserModels = (id, data, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    username: data.username,
    email: data.email,
    password: data.password,
    pin: data.pin,
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
  const que = `UPDATE users SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteUser = (id, cb) =>{
  const que = 'DELETE FROM users WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};