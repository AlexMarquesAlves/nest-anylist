import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid') // * TypeORM decorators
  @Field(() => ID) // * GraphQL decorators
  id: string

  @Column() // * TypeORM decorators
  @Field(() => String) // * GraphQL decorators
  name: string

  @Column() // * TypeORM decorators
  @Field(() => Float) // * GraphQL decorators
  quantity: number

  @Column({ nullable: true }) // * TypeORM decorators
  @Field(() => String, { nullable: true }) // * GraphQL decorators
  quantityUnits?: string //  g, ml, kg, tsp

  // ? stores
  // ? users
}
