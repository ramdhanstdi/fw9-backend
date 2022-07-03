const db = require('../helpers/db');

exports.ListUserModels = (cb) => {
  db.query('SELECT * FROM users ORDER BY id ASC',(err, res)=>{
    cb(res.rows);
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