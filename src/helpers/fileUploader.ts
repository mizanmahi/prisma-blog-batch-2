import multer from 'multer';
import path from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import { UploadedFile } from '../app/interfaces/file';

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

const saveToCloudinary = (
   file: UploadedFile
): Promise<UploadApiResponse | undefined> => {
   return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
         file.path,
         { public_id: file.originalname },
         (error, result) => {
            fs.unlinkSync(file.path);
            if (error) {
               reject(error);
            } else {
               resolve(result);
            }
         }
      );
   });
};

export const fileUploader = {
   upload,
   saveToCloudinary,
};
