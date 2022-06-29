const db = require('../helpers/db');

exports.ListTransactionModels = (cb) => {
  db.query('SELECT * FROM transaction',(err, res)=>{
    cb(res.rows);
  });
};

exports.createTransactionModels = (data, cb) =>{
  const que = 'INSERT INTO transaction (sender_id, receiver_id, transfertype, amount, balance_id, time_transfer, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*';
  const value = [data.sender_id, data.receiver_id, data.transfertype, data.amount, data.balance_id, data.time_transfer, data.notes];
  db.query(que,value,(err, res)=>{
    if(err){
      console.log(err);
    }
    cb(res.rows);
  });
};

exports.editTransactionModels = (id, data, cb) =>{
  const que = 'UPDATE transaction SET sender_id=$1, receiver_id=$2, transfertype=$3, amount=$4, balance_id=$5, time_transfer=$6, notes=$7 WHERE id=$8 RETURNING*';
  const value = [data.sender_id, data.receiver_id, data.transfertype, data.amount, data.balance_id, data.time_transfer, data.notes, id];
  db.query(que,value,(err, res)=>{
    if(err){
      console.log(err);
    }
    cb(res.rows);
  });
};

exports.deleteProfile = (id, cb) =>{
  const que = 'DELETE FROM profile WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    if(err){
      console.log(err);
    }
    cb(res.rows);
  });
};