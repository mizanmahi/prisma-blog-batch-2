import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../config/awsConfig';
import { UploadedFile } from '../app/interfaces/file';
import config from '../config/config';

const uploadImageS3 = async (file: UploadedFile) => {
   console.log(file);
   const bucket = 'filula';

   // Upload file to S3
   const params = {
      Bucket: bucket,
      Key: file.originalname,
      Body: file.buffer,
   };

   try {
      const result = await s3Client.send(new PutObjectCommand(params));
      const uploadUrl = `https://${bucket}.s3.${config.aws_region}.amazonaws.com/${file.originalname}`;
      console.log({ result, uploadUrl });
   } catch (err) {
      console.error(err);
   }
};

export default uploadImageS3;
