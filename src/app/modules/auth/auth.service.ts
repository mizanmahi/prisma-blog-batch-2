import prisma from '../../../shared/prismaClient';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelper';

const loginUser = async (payload: { email: string; password: string }) => {
   // checking if a user with this email exist
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: payload.email,
         isDelete: false,
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
      '10m'
   );
   const refreshToken = jwtHelpers.generateToken(
      { email: payload.email },
      'refreshSecret',
      '30m'
   );

   console.log(accessToken);

   return {
      accessToken,
      refreshToken,
   };
};
const refreshToken = async (token: string) => {
   let decodedData;
   try {
      decodedData = jwtHelpers.verifyToken(token, 'refreshSecret');
   } catch (error) {
      throw new Error('You are not authorized');
   }

   // checking if user exist and throw if not
   await prisma.user.findUniqueOrThrow({
      where: {
         email: decodedData.email,
         isDelete: false,
      },
   });

   // generating new token
   const accessToken = jwtHelpers.generateToken(
      { email: decodedData.email },
      'secret',
      '10m'
   );

   return {
      accessToken,
   };
};

export const authService = {
   loginUser,
   refreshToken,
};
