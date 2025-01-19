import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'To do quick aggregation' })
export class AggregationsType {
  constructor(parameters) {}

  @Field(() => Int)
  total: number
  @Field(() => Int)
  pending: number
  @Field(() => Int)
  completed: number
}
