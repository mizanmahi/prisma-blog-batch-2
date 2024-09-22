import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../config/awsConfig';
import { UploadedFile } from '../app/interfaces/file';
import config from '../config/config';
import fs from 'fs';

const uploadImageS3 = async (file: UploadedFile) => {
   console.log(file);

   const fileBuffer = fs.readFileSync(file.path);
   // console.log(fileBuffer);

   // Upload file to S3
   const params = {
      Bucket: config.aws_bucket_name,
      Key: file.filename,
      Body: fileBuffer,
   };

   try {
      const result = await s3Client.send(new PutObjectCommand(params));
      const uploadUrl = `https://${config.aws_bucket_name}.s3.${config.aws_region}.amazonaws.com/${file.filename}`;
      // console.log({ result, uploadUrl });
      return uploadUrl;
   } catch (err) {
      console.error(err);
   }
};

export default uploadImageS3;
