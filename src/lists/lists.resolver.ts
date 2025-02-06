import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User } from '../users/entities/user.entity'
import { CreateListInput } from './dto/create-list.input'
import { UpdateListInput } from './dto/update-list.input'
import { List } from './entities/list.entity'
import { ListsService } from './lists.service'

@Resolver(() => List)
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Mutation(() => List, { name: 'createList' })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.create(createListInput, user)
  }

  @Query(() => [List], { name: 'lists' })
  findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs)
  }

  @Query(() => List, { name: 'list' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listsService.findOne(id)
  }

  @Mutation(() => List)
  updateList(@Args('updateListInput') updateListInput: UpdateListInput) {
    return this.listsService.update(updateListInput.id, updateListInput)
  }

  @Mutation(() => List)
  removeList(@Args('id', { type: () => Int }) id: number) {
    return this.listsService.remove(id)
  }
}
