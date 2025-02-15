import { Field, ID, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator'

@InputType()
export class CreateListItemInput {
  @Field(() => Number, { nullable: true }) //* GraphQL decorators
  @IsOptional() //* class-validator decorators
  @Min(0)
  @IsNumber()
  quantity: number = 0

  @Field(() => Boolean, { nullable: true }) //* GraphQL decorators
  @IsOptional() //* class-validator decorators
  @IsBoolean()
  completed: boolean = false

  @Field(() => ID) //* GraphQL decorators
  @IsUUID() //* class-validator decorators
  listId: string

  @Field(() => ID) //* GraphQL decorators
  @IsUUID() //* class-validator decorators
  itemId: string
}
