import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../items/entities/item.entity'
import { ItemsService } from '../items/items.service'
import { ListItem } from '../list-item/entities/list-item.entity'
import { List } from '../lists/entities/list.entity'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { SEED_ITEMS, SEED_USERS } from './data/seed-data'

const logger = new Logger('SeedService')

@Injectable()
export class SeedService {
  private isProd: boolean

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,

    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>
  ) {
    this.isProd = configService.get('STATE') === 'prod'
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.')
    }
    // * Limpiar la base de datos BORRANDO TODO
    await this.deleteDatabase()

    // * Crear los datos de usuario ejemplo
    const user = await this.loadUsers()

    // * Crear los datos de items ejemplo
    await this.loadItems(user)

    logger.log('SeedService executed successfully')
    return true
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
}
