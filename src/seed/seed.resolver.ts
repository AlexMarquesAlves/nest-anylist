import { Mutation, Resolver } from '@nestjs/graphql'
import { SeedService } from './seed.service'

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => String || Boolean, {
    name: 'Seed',
    description: 'Seed the database with some data',
  })
  async executeSeed(): Promise<string | boolean> {
    return this.seedService.executeSeed()
  }
}
