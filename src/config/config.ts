export default () => ({
  env: process.env.NODE_ENV,
  cors: {
    credentials: true,
    origin: process.env.CORS_ORIGINS.split(','),
    allowedHeaders: ['Content-Type', 'X-XSRF-Token'],
  },
  xsrf: {
    cookie: {
      maxAge: process.env.XSRF_TOKEN_MAX_AGE,
      secure: process.env.NODE_ENV != 'local',
      sameSite: 'lax',
    },
    token: {
      name: 'edu_xsrf_token',
      max_age: process.env.XSRF_TOKEN_MAX_AGE,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration_time: process.env.JWT_EXPIRATION_TIME,
  },
});
