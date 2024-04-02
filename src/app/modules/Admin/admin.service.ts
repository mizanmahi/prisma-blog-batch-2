import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import {
   IPaginationParams,
   ISortingParams,
} from '../../interfaces/paginationSorting';
import { IUserFilterParams } from '../User/user.interface';
import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';
import { searchableFields } from './admin.constants';

const getAllFromDB = async (
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

export const AdminService = {
   getAllFromDB,
};
