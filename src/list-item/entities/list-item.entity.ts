import { Field, ID, ObjectType } from '@nestjs/graphql'
import { List } from 'src/lists/entities/list.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('listItems')
@ObjectType()
export class ListItem {
  @PrimaryGeneratedColumn('uuid') //* TypeORM decorators
  @Field(() => ID) //* GraphQl decorators
  id: string

  @Column({ type: 'numeric' }) //* TypeORM decorators
  @Field(() => Number) //* GraphQl decorators
  quantity: number

  @Column({ type: 'boolean' }) //* TypeORM decorators
  @Field(() => Boolean) //* GraphQl decorators
  completed: boolean

  // TODO: Relaciones
  @ManyToOne(
    () => List,
    (list) => list.listItem,
    { lazy: true }
  )
  list: List

  // item: Item
}
