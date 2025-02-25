import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { CreateListItemInput } from './create-list-item.input'

@InputType()
export class UpdateListItemInput extends PartialType(CreateListItemInput) {
  @Field(() => ID) //* GraphQL decorators
  @IsUUID() //* class-validator decorators
  id: string
}
