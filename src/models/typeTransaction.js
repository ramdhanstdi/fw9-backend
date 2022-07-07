const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.ListTypeTransactionModels = (searchBy, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) => {
  const que = `SELECT * FROM typetransaction WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countTypeTransactionModels = (searchBy, keyword, cb) =>{
  const que = `SELECT * FROM typetransaction WHERE ${searchBy} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.getDetailTypeTransaction = (id,cb) => {
  db.query(`SELECT * FROM typetransaction WHERE id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.createTypeTransactionModels = (data, cb) =>{
  const que = 'INSERT INTO typetransaction (name, description) VALUES ($1, $2) RETURNING*';
  const value = [data.name, data.description];
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.editTypeTransactionModels = (id, data, cb) =>{
  const que = 'UPDATE typetransaction SET name=$1, description=$2 WHERE id=$3 RETURNING*';
  const value = [data.name, data.description, id];
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteTypeTransactionModels = (id, cb) =>{
  const que = 'DELETE FROM typetransaction WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};