import { Admin, Prisma, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import {
   IPaginationParams,
   ISortingParams,
} from '../../interfaces/paginationSorting';
import { IUserFilterParams } from '../user/user.interface';
import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';
import { searchableFields } from './admin.constants';

const getAllAdminFomDB = async (
   queryParams: IUserFilterParams,
   paginationAndSortingQueryParams: IPaginationParams & ISortingParams
) => {
   const { q, ...otherQueryParams } = queryParams;

   const { limit, skip, page, sortBy, sortOrder } =
      generatePaginateAndSortOptions({
         ...paginationAndSortingQueryParams,
      });

   const conditions: Prisma.AdminWhereInput[] = [];

   // filtering out the soft deleted users
   conditions.push({
      isDeleted: false,
   });

   //@ searching
   if (q) {
      const searchConditions = searchableFields.map((field) => ({
         [field]: { contains: q, mode: 'insensitive' },
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

   const result = await prisma.admin.findMany({
      where: { AND: conditions },
      skip,
      take: limit,
      orderBy: {
         [sortBy]: sortOrder,
      },
   });

   const total = await prisma.admin.count({
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

const getSingleAdminFromDB = async (id: string) => {
   return await prisma.admin.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });
};

const updateAdminIntoDB = async (
   id: string,
   data: Partial<Admin>
): Promise<Admin> => {
   await prisma.admin.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });

   return await prisma.admin.update({
      where: {
         id,
      },
      data,
   });
};
const deleteAdminFromDB = async (id: string): Promise<Admin> => {
   await prisma.admin.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });

   return await prisma.$transaction(async (trClient) => {
      const deletedAdmin = await trClient.admin.delete({
         where: {
            id,
         },
      });

      await trClient.user.delete({
         where: {
            email: deletedAdmin.email,
         },
      });

      return deletedAdmin;
   });
};

const softDeleteAdminFromDB = async (id: string): Promise<Admin | null> => {
   await prisma.admin.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });

   return await prisma.$transaction(async (trClient) => {
      const adminDeletedData = await trClient.admin.update({
         where: {
            id,
         },
         data: {
            isDeleted: true,
         },
      });

      await trClient.user.update({
         where: {
            email: adminDeletedData.email,
         },
         data: {
            status: UserStatus.DELETED,
         },
      });

      return adminDeletedData;
   });
};

export const AdminService = {
   getAllAdminFomDB,
   getSingleAdminFromDB,
   updateAdminIntoDB,
   deleteAdminFromDB,
   softDeleteAdminFromDB,
};
