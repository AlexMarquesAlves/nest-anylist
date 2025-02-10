import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../items/entities/item.entity'
import { ItemsService } from '../items/items.service'
import { ListItem } from '../list-item/entities/list-item.entity'
import { ListItemService } from '../list-item/list-item.service'
import { List } from '../lists/entities/list.entity'
import { ListsService } from '../lists/lists.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { SEED_ITEMS, SEED_LISTS, SEED_USERS } from './data/seed-data'

@Injectable()
export class SeedService {
  private isProd: boolean
  private logger = new Logger('SeedService')

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,

    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>
  ) {
    this.isProd = this.configService.get('STATE') === 'prod'
  }

  async executeSeed(): Promise<string | boolean> {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.')
    }
    // * Limpiar la base de datos BORRANDO TODO
    await this.deleteDatabase()

    // * Crear los datos de usuario ejemplo
    const user = await this.loadUsers()

    // * Crear los datos de items ejemplo
    await this.loadItems(user)

    // * Crear los datos de list ejemplo
    const list = await this.loadLists(user)

    // * Crear los datos de list items ejemplo
    const items = await this.itemsService.findAll(user, { limit: 20, offset: 0 }, {})
    await this.loadListItems(list, items)

    this.logger.log('SeedService executed successfully')
    return 'SeedService executed successfully'
  }

  async deleteDatabase() {
    //! Delete all list items table data
    await this.listItemsRepository.createQueryBuilder().delete().where({}).execute()

    //! Delete all list table data
    await this.listsRepository.createQueryBuilder().delete().where({}).execute()

    //! Delete all items table data
    await this.itemsRepository.createQueryBuilder().delete().where({}).execute()

    //! Delete all users table data
    await this.usersRepository.createQueryBuilder().delete().where({}).execute()
  }

  async loadUsers(): Promise<User> {
    const users = []

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user))
    }

    return users[0]
  }

  async loadItems(user: User): Promise<void> {
    const itemsPromises = []

    for (const item of SEED_ITEMS) {
      itemsPromises.push(await this.itemsService.create(item, user))
    }

    await Promise.all(itemsPromises)
  }

  async loadLists(user: User): Promise<List> {
    const lists = []

    for (const list of SEED_LISTS) {
      lists.push(await this.listsService.create(list, user))
    }

    return lists[0]
  }

  async loadListItems(list: List, items: Item[]) {
    for (const item of items) {
      this.listItemService.create({
        quantity: Math.round(Math.random() * 10),
        completed: Math.round(Math.random() * 1) === 0 ? false : true,
        listId: list.id,
        itemId: item.id,
      })
    }
  }
}
