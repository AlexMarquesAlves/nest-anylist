import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ValidRoles } from '../auth/enums/valid-roles.enum'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { PaginationArgs, SearchArgs } from '../common/dto/args'
import { Item } from '../items/entities/item.entity'
import { ItemsService } from '../items/items.service'
import { ValidRolesArgs } from './dto/args/roles.arg'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService
  ) {}

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) _user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<User[]> {
    return this.usersService.findAll(
      validRoles.roles,
      paginationArgs,
      searchArgs
    )
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User
  ): Promise<User> {
    return this.usersService.findOneById(id)
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user)
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return this.usersService.block(id, user)
  }

  @ResolveField(() => Int, { name: 'itemCount' })
  async itemCount(
    @CurrentUser([ValidRoles.admin]) _adminUser: User,
    @Parent() user: User
  ): Promise<number> {
    return this.itemsService.itemCountByUser(user)
  }

  @ResolveField(() => [Item], { name: 'items' })
  async getItemsByUser(
    @CurrentUser([ValidRoles.admin]) _adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<Item[]> {
    return this.itemsService.findAll(user, paginationArgs, searchArgs)
  }
}
