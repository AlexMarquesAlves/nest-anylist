import { Module } from '@nestjs/common'
import { ListsResolver } from './lists.resolver'
import { ListsService } from './lists.service'

@Module({
  providers: [ListsResolver, ListsService],
})
export class ListsModule {}
