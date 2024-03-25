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
   }

   //@ filtering with exact value
   if (Object.keys(otherQueryParams).length > 0) {
      const filterData = Object.keys(otherQueryParams).map((key) => ({
         [key]: otherQueryParams[key],
      }));
      conditions.push(...filterData);
   }

   return await prisma.user.findMany({
      where: { AND: conditions },
   });
};

export const userService = {
   createUser,
   getUsersFromDB,
};
