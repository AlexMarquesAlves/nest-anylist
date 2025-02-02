import { ArgsType, Field } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@ArgsType()
export class SearchArg {
  constructor() {}

  @Field(() => String, { nullable: true }) // GraphQl decorators
  @IsOptional() // Class-validator decorators
  @IsString()
  search?: string
}
