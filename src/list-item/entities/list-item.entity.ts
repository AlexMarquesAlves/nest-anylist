import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  // list: List

  // item: Item
}
