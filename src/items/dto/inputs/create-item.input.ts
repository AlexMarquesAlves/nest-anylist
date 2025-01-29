import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateItemInput {
  @Field(() => String, {}) // * GraphQL decorators
  @IsString() // * Class validator decorators
  @IsNotEmpty()
  name: string

  // @Field(() => Float, {}) // * GraphQL decorators
  // @IsPositive() // * Class validator decorators
  // quantity: number

  @Field(() => String, { nullable: true }) // * GraphQL decorators
  @IsString() // * Class validator decorators
  @IsOptional()
  quantityUnits?: string
}
