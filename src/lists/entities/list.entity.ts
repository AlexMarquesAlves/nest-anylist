import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ListItem } from 'src/list-item/entities/list-item.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid') //* TypeORM decorators
  @Field(() => ID) //* GraphQl decorators
  id: string

  @Column() //* TypeORM decorators
  @Field(() => String) //* GraphQl decorators
  name: string

  // Relaciones
  @ManyToOne(
    () => User,
    (user) => user.lists,
    { nullable: false, lazy: true }
  ) // * TypeORM decorators
  @Index('userId-list-index')
  @Field(() => User) //* GraphQl decorators
  user: User

  @OneToMany(
    () => ListItem,
    (listItem) => listItem.list,
    { lazy: true }
  )
  @Field(() => [ListItem])
  listItem: ListItem[]
}
