const admin = require('firebase-admin');
const serviceAccount = require('../../stdiwallet-firebase-adminsdk-pnys6-a1b9ac4479.json');
const {DATABASE_URL} = process.env;

const sendMessage = (token, msg) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: DATABASE_URL,
  });
  
  const registrationToken = token;
  
  const notification = {
    title: 'Horay U Got Money',
    body: msg,
  };
  
  
  admin.messaging().sendToDevice(registrationToken,{notification})
    .then((response)=>{
      console.log('msg Sent', response);
    })
    .catch((error)=>{
      console.log('Not Sent',error);
    });
};

module.exports = sendMessage;


