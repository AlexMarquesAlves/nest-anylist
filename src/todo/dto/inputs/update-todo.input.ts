import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator'

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number

  @Field(() => String, {
    description: 'What needs to be done?',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description?: string

  @Field(() => Boolean, { nullable: true })
  done?: boolean
}
