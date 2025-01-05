import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfiguration } from './config/env.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
