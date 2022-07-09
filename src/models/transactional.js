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

exports.creataTransProfile = (data,cb)=>{
  const q ='INSERT INTO profile (user_id) VALUES ($1) RETURNING*';
  const val= [data.id];
  db.query(q,val,(err,res)=>{
    console.log(err);
    cb(err,res);
  });
};