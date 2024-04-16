import { Admin, UserRole } from '@prisma/client';
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

   const result = await prisma.$transaction(async (trClient) => {
      await trClient.user.create({
         data: userData,
      });
      return await trClient.admin.create({
         data: req.body.admin,
      });
   });

   return result;
};

export const userService = {
   createAdmin,
};
