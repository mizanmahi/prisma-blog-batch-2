import prisma from '../../../shared/prismaClient';
import * as bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config/config';
import { Secret } from 'jsonwebtoken';

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
      { email: payload.email, userId: userData.id },
      config.jwt.jwtSecret as Secret,
      config.jwt.expiresIn
   );
   const refreshToken = jwtHelpers.generateToken(
      { email: payload.email, userId: userData.id },
      config.jwt.refreshTokenSecret as Secret,
      config.jwt.refreshTokenExpiresIn
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
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: decodedData.email,
         isDelete: false,
      },
   });

   // generating new token
   const accessToken = jwtHelpers.generateToken(
      { email: decodedData.email, userId: userData.id },
      config.jwt.jwtSecret as Secret,
      config.jwt.expiresIn
   );

   return {
      accessToken,
   };
};

export const authService = {
   loginUser,
   refreshToken,
};
