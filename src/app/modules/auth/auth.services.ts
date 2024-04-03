import * as bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import { UserStatus } from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config/config';

const loginUser = async (payload: { email: string; password: string }) => {
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: payload.email,
         status: UserStatus.ACTIVE,
      },
   });

   const isCorrectPassword: boolean = await bcrypt.compare(
      payload.password,
      userData.password
   );

   if (!isCorrectPassword) {
      throw new Error('Password is incorrect!');
   }
   const accessToken = jwtHelpers.generateToken(
      {
         email: userData.email,
         role: userData.role,
      },
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
   );

   const refreshToken = jwtHelpers.generateToken(
      {
         email: userData.email,
         role: userData.role,
      },
      config.jwt.refresh_token_secret as Secret,
      config.jwt.refresh_token_expires_in as string
   );

   return {
      accessToken,
      refreshToken,
      passwordChangeRequired: userData.passwordChangeRequired,
   };
};

const refreshToken = async (token: string) => {
   let decodedData;
   try {
      decodedData = jwtHelpers.verifyToken(
         token,
         config.jwt.refresh_token_secret as Secret
      );
   } catch (err) {
      throw new Error('You are not authorized!');
   }

   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: decodedData.email,
         status: UserStatus.ACTIVE,
      },
   });

   const accessToken = jwtHelpers.generateToken(
      {
         email: userData.email,
         role: userData.role,
      },
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
   );

   return {
      accessToken,
      passwordChangeRequired: userData.passwordChangeRequired,
   };
};

export const authServices = {
   loginUser,
   refreshToken,
};
