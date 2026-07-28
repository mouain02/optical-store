import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({

 cloudinary,

 params:{
   folder:"optical-store/products",

   resource_type:"image",

   allowed_formats:[
    "jpg",
    "jpeg",
    "png",
    "webp"
   ],
 }

});



const uploadProductImages = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

}).array("images", 10);



export default uploadProductImages;