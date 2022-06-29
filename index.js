require('dotenv').config();

const {PORT: port} = process.env;
const express = require('express');
const db = require('./src/helpers/db');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
  return res.json({
    success: true,
    message: 'backend is running'
  });
});

app.use('/',require('./src/routes'));

app.post('/login', (req, res) => {
  let que = 'SELECT * FROM users WHERE email=$1 AND password=$2';
  let value = [req.body.email, req.body.password];
  if(req.body.email&&req.body.password){
    db.query(que, value,(err, result)=>{
      if(err){
        console.log(err);
      }if(result.rowCount > 0){
        console.log('result');
        res.json({
          success: true,
          massages: 'login complete'
        });
      }else{
        res.json({
          success: false,
          massages: 'incorrect email / password'
        });
      }
    });
  }
});

app.use('*',(req, res)=>{
  return res.status(404).json({
    success: false,
    message: 'Not Found'
  });
});

app.listen(port,()=>{
  console.log(`App running in port ${port}`);
});