export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  port: +process.env.PORT || 3002,
})
