export default {
  secret: process.env.APP_SECRET || "DefaultSecret",
  expiresIn: Number(process.env.APP_EXPIRES) || "1d",
};
