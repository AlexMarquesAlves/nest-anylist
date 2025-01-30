import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid') // * TypeORM decorators
  @Field(() => ID) // * GraphQL decorators
  id: string

  @Column() // * TypeORM decorators
  @Field(() => String) // * GraphQL decorators
  name: string

  // @Column() // * TypeORM decorators
  // @Field(() => Float) // * GraphQL decorators
  // quantity: number

  @Column({ nullable: true }) // * TypeORM decorators
  @Field(() => String, { nullable: true }) // * GraphQL decorators
  quantityUnits?: string //  g, ml, kg, tsp

  // ? stores
  // ? users
  @ManyToOne(() => User, (user) => user.items, { nullable: false, lazy: true }) // * TypeORM decorators
  @Index('userId-index') // * TypeORM decorators
  @Field(() => User) // * GraphQL decorators
  user: User
}
