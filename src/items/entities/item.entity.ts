import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  quantity: number

  @Column()
  quantityUnits: string //  g, ml, kg, tsp

  // ? stores
  // ? users
}
