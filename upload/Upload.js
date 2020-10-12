const multer=require('multer');
const mkdire=require('mkdirp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //mkdire agh vojod nadashth bash oky mikond
    mkdire('./public/upload/img/imgProfile').then(made=>{
        cb(null, './public/upload/img/imgProfile')
    });
},
    filename: function (req, file, cb) {
      cb(null,  Date.now()+'-'+ file.originalname  )
    }
  })
  const upload = multer({ storage: storage });

module.exports=upload;