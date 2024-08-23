import multer from 'multer';
import path from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import { UploadedFile } from '../app/interfaces/file';
import config from '../config/config';

const storage = multer.diskStorage({
   destination: function (_req, _file, cb) {
      cb(null, path.join(process.cwd(), '/uploads'));
   },
   filename: function (req, file, cb) {
      // Remove spaces, add a hyphen, and append a timestamp
      const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
      const timestamp = Date.now();
      const filename = `${sanitizedFilename}-${timestamp}${path.extname(
         file.originalname
      )}`;
      cb(null, filename);
   },
});

// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ storage });

cloudinary.config({
   cloud_name: 'mizan-ph',
   api_key: config.cloudinary_api_key,
   api_secret: config.cloudinary_api_secret,
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
