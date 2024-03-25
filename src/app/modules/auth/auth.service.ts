import prisma from '../../../shared/prismaClient';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: { email: string; password: string }) => {
   // checking if a user with this email exist
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: payload.email,
      },
   });

   // check if the provided password is correct
   const isCorrectPassword: boolean = await bcrypt.compare(
      payload.password,
      userData.password
   );

   if (!isCorrectPassword) {
      throw new Error('Incorrect password');
   }

   const accessToken = jwt.sign({ email: payload.email }, 'secret', {
      algorithm: 'HS256', // based on this you might need to change the secret key, so choose it wisely
      expiresIn: '5m',
   });
   const refreshToken = jwt.sign({ email: payload.email }, 'secret', {
      algorithm: 'HS256', // based on this you might need to change the secret key, so choose it wisely
      expiresIn: '15d',
   });

   console.log(accessToken);

   return {
      accessToken,
      refreshToken,
   };
};

export const authService = {
   loginUser,
};
