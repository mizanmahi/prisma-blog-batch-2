import { Request } from 'express';
import { Admin, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';
import { fileUploader } from '../../../helpers/fileUploader';
import { UploadApiResponse } from 'cloudinary';

const createAdmin = async (req: Request): Promise<Admin> => {
   console.log(req.file);
   console.log(req.body.data);

   let uploadedFile: UploadApiResponse | undefined;

   if (req.file) {
      uploadedFile = await fileUploader.saveToCloudinary(req.file);
   }

   const payload = JSON.parse(req.body.data);

   const hashedPassword = await bcrypt.hash(payload.password, 10);

   const userData = {
      email: payload.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
   };

   const result = await prisma.$transaction(async (trClient) => {
      await trClient.user.create({
         data: userData,
      });
      return await trClient.admin.create({
         data: { ...payload.admin, profilePhoto: uploadedFile?.secure_url },
      });
   });

   return result;
};

export const userService = {
   createAdmin,
};
