const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const {MAX_SIZE} = process.env;

//destination to saved uploaded file
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:'stdiwallet',
    format: async(req,file)=>{
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: (req,file) => new Date().getTime()
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