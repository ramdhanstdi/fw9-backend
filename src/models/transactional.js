const db = require('../helpers/db');

exports.createTransUser = (data,cb) =>{
  db.query('BEGIN', err=>{
    if(err)console.log(err);
    else{
      const queryUser = 'INSERT INTO users (username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING*';
      const valUser = [data.username, data.email, data.password, data.pin];
      db.query(queryUser,valUser,(err,res)=>{
        if(err){console.log(err);
        }else{
          const queryProfile = 'INSERT INTO profile (user_id) VALUES ($1)';
          const valProfile = [res.rows[0].id];
          db.query(queryProfile,valProfile,(err,res)=>{
            if(err){console.log();
            }else{
              cb(err,res);
              db.query('COMMIT',err=>{
                if (err)console.log(err);
              });
            }
          });
        }
      });
    }
  });
};

exports.createTransaction = (sender,data,cb)=>{
  const que = 'INSERT INTO transaction (sender_id,receiver_id,transfertype,amount,time_transfer,notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING*';
  const value = [sender,data.receiver,data.typeTransaction,data.amount,data.time,data.notes];
  db.query(que,value,(err,res)=>{
    if(res){
      cb(err,res);
    }else{
      cb(err);
    }
  });
};