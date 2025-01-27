import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class AuthResponse {
  @Field(() => String) // * GraphQl Decorators
  token: string

  @Field(() => User) // * GraphQl Decorators
  user: User
}
