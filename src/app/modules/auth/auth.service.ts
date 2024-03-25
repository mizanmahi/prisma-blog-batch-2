import prisma from '../../../shared/prismaClient';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelper';

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

   const accessToken = jwtHelpers.generateToken(
      { email: payload.email },
      'secret',
      '5m'
   );
   const refreshToken = jwtHelpers.generateToken(
      { email: payload.email },
      'refreshSecret',
      '5m'
   );

   console.log(accessToken);

   return {
      accessToken,
      refreshToken,
   };
};

export const authService = {
   loginUser,
};
