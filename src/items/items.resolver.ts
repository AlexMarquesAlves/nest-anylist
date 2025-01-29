import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { User } from 'src/users/entities/user.entity'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateItemInput, UpdateItemInput } from './dto/inputs'
import { Item } from './entities/item.entity'
import { ItemsService } from './items.service'

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItem' })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.create(createItemInput, user)
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(user: User): Promise<Item[]> {
    return this.itemsService.findAll(user)
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.findOne(id, user)
  }

  @Mutation(() => Item, { name: 'updateItem' })
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput
  ): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput)
  }

  @Mutation(() => Item, { name: 'removeItem' })
  removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.remove(id, user)
  }
}
