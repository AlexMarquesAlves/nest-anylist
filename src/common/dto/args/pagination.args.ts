import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsOptional, Min } from 'class-validator'

@ArgsType()
export class PaginationArg {
  constructor() {}

  @Field(() => Int, { nullable: true }) // GraphQl decorators
  @IsOptional() // Class-validator decorators
  @Min(0)
  offset: number = 0

  @Field(() => Int, { nullable: true }) // GraphQl decorators
  @IsOptional() // Class-validator decorators
  @Min(1)
  limit: number = 10
}
