export default () => ({
  cors: {
    credentials: true,
    origin: ['http://localhost:4200'],
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration_time: process.env.JWT_EXPIRATION_TIME,
  },
});
