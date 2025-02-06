import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Item } from 'src/items/entities/item.entity'
import { List } from 'src/lists/entities/list.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('listItems')
@Unique('listItem-item', ['list', 'item'])
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

  @ManyToOne(
    () => Item,
    (item) => item.listItem,
    { lazy: true }
  )
  @Field(() => Item)
  item: Item
}
