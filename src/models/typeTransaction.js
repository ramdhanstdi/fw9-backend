const db = require('../helpers/db');

exports.ListTypeTransferModels = (cb) => {
  db.query('SELECT * FROM typetransaction ORDER BY id ASC',(err, res)=>{
    cb(res.rows);
  });
};

exports.createTypeTransferModels = (data, cb) =>{
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

exports.editTypeTransferModels = (id, data, cb) =>{
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

exports.deleteTypeTransferModels = (id, cb) =>{
  const que = 'DELETE FROM typetransaction WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(res);
  });
};