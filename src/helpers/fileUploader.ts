import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), '/uploads'));
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage: storage });

cloudinary.config({
   cloud_name: 'mizan-ph',
   api_key: '448877366715569',
   api_secret: 'BsXpD1ngFJYBfvlbKcgdPC4wUcc',
});

const saveToCloudinary = async (file: any) => {
   let result;
   cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      function (error, result) {
         console.log(result);
         result = result;
      }
   );

   return result;
};

export const fileUploader = {
   upload,
   saveToCloudinary,
};
