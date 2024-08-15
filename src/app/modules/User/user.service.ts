import { Admin, Author, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';
import { fileUploader } from '../../../helpers/fileUploader';

const createAdmin = async (req: any): Promise<Admin> => {
   if (req.file) {
      const uploadedFile = await fileUploader.saveToCloudinary(req.file);
      req.body.admin.profilePhoto = uploadedFile?.secure_url;
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const userData = {
      email: req.body.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
   };

   const result = await prisma.$transaction(async (txClient) => {
      await txClient.user.create({
         data: userData,
      });
      return await txClient.admin.create({
         data: req.body.admin,
      });
   });

   return result;
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
      role: UserRole.BLOGGER,
   };

   const result = await prisma.$transaction(async (txClient) => {
      await txClient.user.create({
         data: userData,
      });
      return await txClient.author.create({
         data: req.body.author,
      });
   });

   return result;
};

export const userService = {
   createAdmin,
   createAuthor,
};
