import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateListInput {
  @Field(() => String, { description: 'Name of list' }) //* GraphQl decorators
  @IsString() //* class-validator decorators
  @IsNotEmpty()
  name: string
}
