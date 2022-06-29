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

exports.editProfileModels = (id, data, cb) =>{
  const que = 'UPDATE profile SET first_name=$1, last_name=$2, profile_photo=$3, num_phone=$4, balance=$5, user_id=$6 WHERE id=$7 RETURNING*';
  const value = [data.first_name, data.last_name, data.profile_photo, data.num_phone, data.balance, data.user_id, id];
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