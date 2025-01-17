import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql'

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

  @Query(() => Int, {
    name: `randomFromZeroTo`,
    description: `returns a random number from 0 --> TO`,
  })
  getRandomFromZeroTo(@Args('to') to: number): number {
    return Math.floor(Math.random() * (to + 1))
  }
}
