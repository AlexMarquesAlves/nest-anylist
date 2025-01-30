import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID) // * GraphQl decorators
  @IsUUID() // * TypeORM decorators
  id: string

  @Field(() => [ValidRoles], { nullable: true }) // * GraphQl decorators
  @IsArray() // * TypeORM decorators
  @IsOptional() // * TypeORM decorators
  roles?: ValidRoles[]

  @Field(() => Boolean, { nullable: true }) // * GraphQl decorators
  @IsBoolean() // * TypeORM decorators
  @IsOptional() // * TypeORM decorators
  isActive?: boolean
}
