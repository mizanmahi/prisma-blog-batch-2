import { Admin, Author, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';
import { fileUploader } from '../../../helpers/fileUploader';
import meiliClient, {
   deleteResourceFromMeili,
} from '../../../shared/meilisearch';
import uploadImageS3 from '../../../helpers/s3Uploader';
const meiliDoctorIndex = meiliClient.index('doctors');
const meiliAuthorIndex = meiliClient.index('authors');

const createAdmin = async (req: any): Promise<Admin> => {
   if (req.file) {
      // const uploadedFile = await fileUploader.saveToCloudinary(req.file);
      const uploadedFile = await uploadImageS3(req.file);
      // req.body.admin.profilePhoto = uploadedFile?.secure_url;
   }

   // const hashedPassword = await bcrypt.hash(req.body.password, 10);

   // const userData = {
   //    email: req.body.admin.email,
   //    password: hashedPassword,
   //    role: UserRole.ADMIN,
   // };

   // const result = await prisma.$transaction(async (txClient) => {
   //    await txClient.user.create({
   //       data: userData,
   //    });
   //    const newAdmin = await txClient.admin.create({
   //       data: req.body.admin,
   //    });

   //    const { id, name, email, profilePhoto } = newAdmin;
   //    await meiliDoctorIndex.addDocuments([{ id, name, email, profilePhoto }]);
   //    return newAdmin;
   // });

   return 'ok';
};

const createAuthor = async (req: any): Promise<Author> => {
   if (req.file) {
      const uploadedFile = await fileUploader.saveToCloudinary(req.file);
      req.body.author.profilePhoto = uploadedFile?.secure_url;
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const userData = {
      email: req.body.author.email,
      password: hashedPassword,
      role: UserRole.AUTHOR,
   };

   const result = await prisma.$transaction(async (txClient) => {
      await txClient.user.create({
         data: userData,
      });
      const newAuthor = await txClient.author.create({
         data: req.body.author,
      });

      const { id, name, email, profilePhoto, contactNumber } = newAuthor;
      await meiliAuthorIndex.addDocuments([
         { id, name, email, profilePhoto, contactNumber },
      ]);

      return newAuthor;
   });

   return result;
};

export const userService = {
   createAdmin,
   createAuthor,
};
