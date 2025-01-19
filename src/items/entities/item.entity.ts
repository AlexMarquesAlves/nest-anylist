import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Item {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
