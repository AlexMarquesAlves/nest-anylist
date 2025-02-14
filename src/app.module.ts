import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'node:path'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { ItemsModule } from './items/items.module'
import { ListItemModule } from './list-item/list-item.module'
import { ListsModule } from './lists/lists.module'
import { SeedModule } from './seed/seed.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),

    // GraphQLModule.forRoot<ApolloDriverConfig>({ // * Configuración básica
    //   driver: ApolloDriver,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({ req }) {
          // const token = req.headers.authorization?.replace(/^Bearer\s+/, '') //? /^Bearer\s+(.*)$/
          // if (!token) throw new Error('Token Needed') //! comment to login and signup work
          // const payload = jwtService.decode(token) //! comment to login and signup work
          // if (!payload) throw new Error('Token not valid') //! comment to login and signup work
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl:
        process.env.STATE === 'prod'
          ? { rejectUnauthorized: false, sslmode: 'require' }
          : (false as any),
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ItemsModule,
    UsersModule,
    AuthModule,
    SeedModule,
    CommonModule,
    ListsModule,
    ListItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private logger = new Logger('AppModule')

  constructor() {
    this.logger.log('STATE', process.env.STATE)
    this.logger.log('host', process.env.DB_HOST)
    this.logger.log('port', +process.env.DB_PORT)
    this.logger.log('username', process.env.DB_USERNAME)
    this.logger.log('password', process.env.DB_PASSWORD)
    this.logger.log('database', process.env.DB_NAME)
  }
}
