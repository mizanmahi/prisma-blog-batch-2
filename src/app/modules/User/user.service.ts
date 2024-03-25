import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { searchableFields } from './user.constant';
import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';
import prisma from '../../../shared/prismaClient';
import { IUserFilterParams } from './user.interface';
import {
   IPaginationParams,
   ISortingParams,
} from '../../interfaces/paginationSorting';

const createUser = async (data: any): Promise<User> => {
   const hashedPassword = await bcrypt.hash(data.password, 10);

   const createdUserData = await prisma.user.create({
      data: { ...data.user, password: hashedPassword },
   });
   return createdUserData;
};

const getUsersFromDB = async (
   queryParams: IUserFilterParams,
   paginationParams: IPaginationParams,
   sortingParams: ISortingParams
) => {
   const { q, ...otherQueryParams } = queryParams;

   const { limit, skip, page, sortBy, sortOrder } =
      generatePaginateAndSortOptions({
         ...paginationParams,
         ...sortingParams,
      });

   const conditions: Prisma.UserWhereInput[] = [];

   // filtering out the soft deleted users
   conditions.push({
      isDelete: false,
   });

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
         [key]: (otherQueryParams as any)[key],
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

   const total = await prisma.user.count({
      where: { AND: conditions },
   });

   return {
      meta: {
         page,
         limit,
         total,
      },
      result,
   };
};

const getSingleUserFromDB = async (userId: string): Promise<User> => {
   const user = await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
         isDelete: false,
      },
   });

   return user;
};

const updateUserIntoDB = async (
   userId: string,
   updatedData: Partial<User>
): Promise<User> => {
   await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
         isDelete: false,
      },
   });

   const user = await prisma.user.update({
      where: {
         id: userId,
      },
      data: updatedData,
   });

   return user;
};

const deleteFromDB = async (userId: string): Promise<User> => {
   await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
      },
   });

   const deleteUser = await prisma.user.delete({
      where: {
         id: userId,
      },
   });

   return deleteUser;
};

const softDeleteFromDB = async (userId: string): Promise<User> => {
   await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
         isDelete: false,
      },
   });

   const user = await prisma.user.update({
      where: {
         id: userId,
      },
      data: {
         isDelete: true,
      },
   });

   return user;
};

export const userService = {
   createUser,
   getUsersFromDB,
   getSingleUserFromDB,
   updateUserIntoDB,
   deleteFromDB,
   softDeleteFromDB,
};
