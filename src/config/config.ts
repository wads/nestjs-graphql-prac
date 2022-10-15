export default () => ({
  env: process.env.NODE_ENV,
  apollo: {
    debug: process.env.APOLLO_DEBUG == 'true',
    playground: process.env.APOLLO_PLAYGROUND == 'true',
  },
  cors: {
    credentials: true,
    origin: process.env.CORS_ORIGINS.split(','),
    allowedHeaders: ['Content-Type', 'X-XSRF-Token'],
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration_time: process.env.JWT_EXPIRATION_TIME,
  },
  xsrf: {
    cookie: {
      maxAge: process.env.XSRF_TOKEN_MAX_AGE,
      secure: process.env.NODE_ENV != 'local',
      sameSite: 'lax',
    },
    token: {
      name: 'ngp_xsrf_token',
      max_age: process.env.XSRF_TOKEN_MAX_AGE,
    },
  },
});
