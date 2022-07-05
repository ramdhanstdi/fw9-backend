const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.ListTransactionModels = (tabel, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) => {
  const que = `SELECT * FROM transaction WHERE ${tabel} LIKE '%${keyword}%' ORDER BY time_transfer ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countTransactionListModels = (tabel, keyword, cb) =>{
  const que = `SELECT * FROM transaction WHERE ${tabel} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.createTransactionModels = (data, cb) =>{
  const que = 'INSERT INTO transaction (sender_id, receiver_id, transfertype, amount, time_transfer, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
  const value = [data.sender_id, data.receiver_id, data.transfertype, data.amount, data.time_transfer, data.notes];
  db.query(que,value,(err, res)=>{
    console.log(err);
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.editTransactionModels = (id, data, cb) =>{
  const que = 'UPDATE transaction SET sender_id=$1, receiver_id=$2, transfertype=$3, amount=$4, time_transfer=$5, notes=$6 WHERE id=$7 RETURNING*';
  const value = [data.sender_id, data.receiver_id, data.transfertype, data.amount, data.time_transfer, data.notes, id];
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