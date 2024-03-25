require('dotenv').config();

const config = {
   nodeEnv: process.env.NODE_ENV || 'development',
   port: process.env.PORT || 5000,
   databaseUrl: process.env.DATABASE_URL,
   jwt: {
      jwtSecret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN || '10m',
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '15d',
   },
};

export default config;
