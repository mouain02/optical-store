import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "optical-store/products",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: "limit",
        quality: "auto",
      },
    ],

  },

});



const uploadProductImages = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

}).array("images", 10);



export default uploadProductImages;