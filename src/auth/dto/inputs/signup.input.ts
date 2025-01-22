import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class SignUpInput {
  @Field(() => String) // * GraphQl Decorators
  @IsEmail() // * Class validator Decorators
  email: string

  @Field(() => String) // * GraphQl Decorators
  @IsString() // * Class validator Decorators
  @IsNotEmpty()
  fullName: string

  @Field(() => String) // * GraphQl Decorators
  @IsString() // * Class validator Decorators
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
