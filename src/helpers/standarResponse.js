const response = (res, msg, pageInfo, result, status=200) => {
  let success = true;

  if(status >= 400){
    success = false;
  }

  const data = {
    success,
    massage: msg
  };
  
  if(pageInfo){
    data.pageInfo=pageInfo;
  }
  
  if(result){
    data.result=result;
  }

  return res.status(status).json(data);
};

module.exports = response;