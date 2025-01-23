import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  providers: [
    AuthResolver,
    AuthService, // JwtStrategy
  ],
  exports: [
    // JwtStrategy, PassportModule, JwtModule
  ],
  imports: [
    // ConfigModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: '4h',
    //     },
    //   }),
    // }),
    UsersModule,
  ],
})
export class AuthModule {}
