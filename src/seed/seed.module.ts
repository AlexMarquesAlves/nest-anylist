import { Module } from '@nestjs/common'
import { ProductsModule } from 'src/products/products.module'
import { SeedController } from './seed.controller'
import { SeedService } from './seed.service'

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule],
  exports: [SeedService],
})
export class SeedModule {}
