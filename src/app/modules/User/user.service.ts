import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { searchableFields } from './user.constant';

const prisma = new PrismaClient();

const createOrderBy = (sortingParams: {
   sortBy: string;
   sortOrder: 'asc' | 'desc';
}): Prisma.UserOrderByWithRelationAndSearchRelevanceInput => {
   const { sortBy, sortOrder } = sortingParams;
   return sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' };
};

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
   const { page = 1, limit = 2 } = paginationParams;
   const orderBy = createOrderBy(sortingParams);

   const conditions: Prisma.UserWhereInput[] = [];

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

   //@ sorting

   return await prisma.user.findMany({
      where: { AND: conditions },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy,
   });
};

export const userService = {
   createUser,
   getUsersFromDB,
};
