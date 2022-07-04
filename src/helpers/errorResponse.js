const response = require('./standarResponse');

const errorHandling = (msg, param, location='body') => [
  {
    msg,
    param,
    location
  }
];

const errorResponse = (err, result) => {
  if(err.code==='23505'&&err.detail.includes('email')){
    const eres = errorHandling('Email already exist', 'email');
    return response(result, 'Error', null, eres, 400);
  }
  if(err.code==='23505'&&err.detail.includes('username')){
    console.log('username');
    const eres = errorHandling('Username already exist', 'username');
    return response(result, 'Error', null, eres, 400);
  }
  if(err.code==='23505'&&err.detail.includes('num_phone')){
    const eres = errorHandling('Number Phone already used', 'num_phone');
    return response(result, 'Error', null, eres, 400);
  }
  if(err.code==='23505'&&err.detail.includes('user_id')){
    console.log('test');
    const eres = errorHandling('User Id already used', 'num_phone');
    return response(result, 'Error', null, eres, 400);
  }
  return response(result, 'Error', null, null, 400);
};

module.exports = errorResponse;