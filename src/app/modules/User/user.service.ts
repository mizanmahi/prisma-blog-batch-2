<<<<<<< HEAD
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (data: any) => {
   const hashedPassword = await bcrypt.hash(data.password, 10);

   const createdUserData = await prisma.user.create({
      data: { ...data.user, password: hashedPassword },
   });
   return createdUserData;
};

const getUsersFromDB = async (queryParams: any) => {
   /* 
   //!using full text search, won't work for multiple field as need raw sql for that (unsupported database features)
   return await prisma.user.findMany({
      where: {
         username: {
            search: queryParams.q,
         },
      },
      select: { id: true, username: true, email: true, isActive: true },
   }); 
   */

   const { q, ...otherQueryParams } = queryParams;

   const conditions: Prisma.UserWhereInput[] = [];

   const searchableFields = ['username', 'email'];

   //@ for searching on multiple fields
   // if (queryParams.q) {
   //    conditions.push({
   //       OR: searchableFields.map((field) => ({
   //          [field]: {
   //             contains: queryParams.q,
   //          },
   //       })),
   //    });
   // }

   // ! refactored
   if (q) {
      const searchConditions = searchableFields.map((field) => ({
         [field]: { contains: q },
      }));
      conditions.push({ OR: searchConditions });
=======
import { Admin, Author, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';
import { fileUploader } from '../../../helpers/fileUploader';

const createAdmin = async (req: any): Promise<Admin> => {
   if (req.file) {
      const uploadedFile = await fileUploader.saveToCloudinary(req.file);
      req.body.admin.profilePhoto = uploadedFile?.secure_url;
>>>>>>> 55c7b29d44141deb21190edd8c78333fcdfedac0
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

<<<<<<< HEAD
   return await prisma.user.findMany({
      where: { AND: conditions },
   });
};

export const userService = {
   createUser,
   getUsersFromDB,
=======
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
      role: UserRole.AUTHOR,
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
>>>>>>> 55c7b29d44141deb21190edd8c78333fcdfedac0
};
