import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { searchableFields } from './user.constant';
import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';
import prisma from '../../../shared/prismaClient';

const createUser = async (data: any) => {
   const hashedPassword = await bcrypt.hash(data.password, 10);

   const createdUserData = await prisma.user.create({
      data: { ...data.user, password: hashedPassword },
   });
   return createdUserData;
};

const getUsersFromDB = async (
   queryParams: any,
   paginationParams: any,
   sortingParams: any
) => {
   const { q, ...otherQueryParams } = queryParams;

   const { limit, skip, page, sortBy, sortOrder } =
      generatePaginateAndSortOptions({
         ...paginationParams,
         ...sortingParams,
      });

   const conditions: Prisma.UserWhereInput[] = [];

   //@ searching
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

   const result = await prisma.user.findMany({
      where: { AND: conditions },
      skip,
      take: limit,
      orderBy: {
         [sortBy]: sortOrder,
      },
   });

   const count = await prisma.user.count({
      where: { AND: conditions },
   });

   return {
      meta: {
         page,
         limit,
         count,
      },
      result,
   };
};

const getSingleUserFromDB = async (userId: string) => {
   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   });

   return user;
};

const updateUserIntoDB = async (userId: string, updatedData: any) => {
   const user = await prisma.user.update({
      where: {
         id: userId,
      },
      data: updatedData,
   });

   return user;
};

export const userService = {
   createUser,
   getUsersFromDB,
   getSingleUserFromDB,
   updateUserIntoDB,
};
