import prisma from '../../../shared/prismaClient';

const createBlog = async (payload: any, user: any) => {
   const result = await prisma.blog.create({
      data: { ...payload, authorId: user.userId },
   });

   return result;
};

export const blogService = {
   createBlog,
};
