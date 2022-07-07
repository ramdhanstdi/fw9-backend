const multer = require('multer');
const path = require('path');
const {MAX_SIZE} = process.env;

//destination to saved uploaded file
const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, path.join(global.__basepath, 'assets', 'uploadProfile'));
  },
  filename : (req, file, cb) => {
    const timestamp = new Date().getTime();
    const ext = file.mimetype.split('/')[1];
    cb(null, `${timestamp}.${ext}`);
  }
});

//for upload can be use in every where
const upload = multer({
  storage,
  limits : {
    fileSize: MAX_SIZE * 1000*1000
  },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/jpg','image/jpeg','image/png','image/webp'];
    if(allowExt.includes(file.mimetype)){
      cb(null, true);
    }else{
      const error = new Error('File not supported');
      cb(error, false);
    }
  }
});

module.exports = upload;