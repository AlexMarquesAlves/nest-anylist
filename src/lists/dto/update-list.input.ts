import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateListInput } from './create-list.input'

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => ID) //* GraphQl decorators
  @IsString() //* class-validator decorators
  @IsNotEmpty()
  @IsUUID()
  id: string
}
