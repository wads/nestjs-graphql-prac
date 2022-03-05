export default () => ({
  env: process.env.NODE_ENV,
  cors: {
    credentials: true,
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'X-XSRF-Token'],
  },
  csrf_cookie: {
    maxAge: 60,
    secure: process.env.NODE_ENV != 'local',
    sameSite: 'lax',
  },
  csrf_token: {
    name: 'edu_xsrf_token',
    max_age: 86400,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration_time: process.env.JWT_EXPIRATION_TIME,
  },
});
