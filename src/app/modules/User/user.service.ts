import { Admin, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';
import { fileUploader } from '../../../helpers/fileUploader';

const createAdmin = async (req: any): Promise<Admin> => {
   // console.log(req.file);
   console.log(req.body.data);

   if (req.file) {
      const uploadedFile = await fileUploader.saveToCloudinary(req.file);
   }

   // const hashedPassword = await bcrypt.hash(data.password, 10);

   // const userData = {
   //    email: data.admin.email,
   //    password: hashedPassword,
   //    role: UserRole.ADMIN,
   // };

   // const result = await prisma.$transaction(async (trClient) => {
   //    await trClient.user.create({
   //       data: userData,
   //    });
   //    return await trClient.admin.create({
   //       data: data.admin,
   //    });
   // });

   // return result;
};

export const userService = {
   createAdmin,
};
