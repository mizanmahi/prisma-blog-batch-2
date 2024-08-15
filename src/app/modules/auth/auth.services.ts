import * as bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import { UserStatus } from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config/config';
import { HTTPError } from '../../errors/HTTPError';
import httpStatus from 'http-status';
import { emailSender } from './emailSender';
import path from 'path';
import fs from 'fs';

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

const changePassword = async (
   user: any,
   payload: { oldPassword: string; newPassword: string }
) => {
   //@ checking if the user exist
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: user.email,
         status: UserStatus.ACTIVE,
      },
   });

   //@ checking if the provided pass is correct
   const isCorrectPassword: boolean = await bcrypt.compare(
      payload.oldPassword,
      userData.password
   );

   if (!isCorrectPassword) {
      throw new HTTPError(httpStatus.UNAUTHORIZED, 'Incorrect Password');
   }

   const newHashedPassword = await bcrypt.hash(payload.newPassword, 10);

   await prisma.user.update({
      where: {
         email: userData.email,
      },
      data: {
         password: newHashedPassword,
         passwordChangeRequired: false,
      },
   });

   return {
      message: 'Password changed successfully',
   };
};

const forgotPassword = async ({ email }: { email: string }) => {
   //@ checking if the user exist
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: email,
         status: UserStatus.ACTIVE,
      },
   });

   //@ creating a short time token
   const resetPasswordToken = jwtHelpers.generateToken(
      {
         email: userData.email,
         role: userData.role,
      },
      config.jwt.reset_token_secret as Secret,
      config.jwt.reset_token_expires_in as string
   );

   const resetPasswordLink = `http://localhost:3000/reset-password?userId=${userData.id}&token=${resetPasswordToken}`;

   //@ reading the html template
   const htmlFilePath = path.join(
      process.cwd(),
      '/src/templates/reset_pass_template.html'
   );
   const htmlTemplate = fs.readFileSync(htmlFilePath, 'utf-8');
   const htmlContent = htmlTemplate.replace(
      '{{resetPasswordLink}}',
      resetPasswordLink
   );

   // console.log(htmlTemplate);

   await emailSender(userData.email, htmlContent);
};

const resetPassword = async (
   token: string,
   { id, password }: { id: string; password: string }
) => {
   //@ checking if the user exist
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         id,
         status: UserStatus.ACTIVE,
      },
   });

   const isValidToken = jwtHelpers.verifyToken(
      token,
      config.jwt.reset_token_secret as Secret
   );

   if (!isValidToken) {
      throw new HTTPError(httpStatus.FORBIDDEN, 'Invalid Token');
   }

   const newHashedPassword = await bcrypt.hash(password, 10);

   await prisma.user.update({
      where: {
         email: userData.email,
      },
      data: {
         password: newHashedPassword,
      },
   });

   return {
      message: 'Password Reset successfully',
   };
};

export const authServices = {
   loginUser,
   refreshToken,
   changePassword,
   forgotPassword,
   resetPassword,
};
