import { Float, Int, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: `hello`,
    description: `Hola mundo es lo que retorna`,
  })
  helloWorld(): string {
    return 'Hello, World!'
  }

  @Query(() => Float, { name: `randomNumber` })
  getRandomNumber(): number {
    return Math.random() * 100
  }

  @Query(() => Int, { name: `randomFromZeroTo` })
  getRandomFromZeroTo(): number {
    return Math.floor(Math.random() * 11)
  }
}
