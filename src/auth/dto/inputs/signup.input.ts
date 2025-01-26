import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class SignUpInput {
  @Field(() => String) // * GraphQl Decorators
  @IsEmail() // * Class validator Decorators
  email: string

  @Field(() => String) // * GraphQl Decorators
  @IsNotEmpty() // * Class validator Decorators
  fullName: string

  @Field(() => String) // * GraphQl Decorators
  @MinLength(6) // * Class validator Decorators
  password: string
}
