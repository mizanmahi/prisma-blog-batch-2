import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   jwt: {
      jwt_secret: process.env.JWT_SECRET,
      expires_in: process.env.EXPIRES_IN,
      refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
      refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
      reset_password_token_secret: process.env.RESET_TOKEN_SECRET,
      reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
   },
   reset_pass_link: process.env.RESET_PASS_LINK,
   sender_email: process.env.SENDER_EMAIL,
   app_password: process.env.APP_PASSWORD,
};
