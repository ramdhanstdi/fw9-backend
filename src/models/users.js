const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.ListUserModels = (tabel, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) => {
  const que = `SELECT * FROM users WHERE ${tabel} LIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countUserListModels = (tabel, keyword, cb) =>{
  const que = `SELECT * FROM users WHERE ${tabel} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.createUserModels = (data, cb) =>{
  const que = 'INSERT INTO users (username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING*';
  const value = [data.username, data.email, data.password, data.pin];
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.editUserModels = (id, data, cb) =>{
  const que = 'UPDATE users SET username=$1, email=$2, password=$3, pin=$4 WHERE id=$5 RETURNING*';
  const value = [data.username, data.email, data.password, data.pin, id];
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
    cb(res);
  });
};