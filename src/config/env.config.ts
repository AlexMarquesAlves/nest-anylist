export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  host: process.env.DB_HOST,
  port: +process.env.PORT || 3002,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
})
