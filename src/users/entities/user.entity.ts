import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' }) // * TypeORM Decorators
@ObjectType() // * GraphQl Decorators
export class User {
  @PrimaryGeneratedColumn('uuid') // * TypeORM Decorators
  @Field(() => ID) // * GraphQl Decorators
  id: string

  @Column() // * TypeORM Decorators
  @Field(() => String) // * GraphQl Decorators
  fullName: string

  @Column({ unique: true }) // * TypeORM Decorators
  @Field(() => String) // * GraphQl Decorators
  email: string

  @Column() // * TypeORM Decorators
  // ? @Field(() => String) // * GraphQl Decorators
  password: string

  @Column({ type: 'text', array: true, default: ['user'] }) // * TypeORM Decorators
  @Field(() => [String]) // * GraphQl Decorators
  roles: string[]

  @Column({ type: 'boolean', default: true }) // * TypeORM Decorators
  @Field(() => Boolean) // * GraphQl Decorators
  isActive: boolean

  // TODO: relaciones y otras cosas...
}
