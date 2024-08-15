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
      reset_token_secret: process.env.REST_TOKEN_SECRET,
      reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
   },
};
