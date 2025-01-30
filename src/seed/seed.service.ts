import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from 'src/items/entities/item.entity'
import { User } from 'src/users/entities/user.entity'
import type { Repository } from 'typeorm'

const logger = new Logger('SeedService')

@Injectable()
export class SeedService {
  private isProd: boolean

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    this.isProd = configService.get('STATE') === 'prod'
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.')
    }
    // * Limpiar la base de datos BORRANDO TODO
    await this.deleteDatabase()

    // * Crear los datos de ejemplo
    await this.createData()

    logger.log('SeedService executed successfully')
    return true
  }

  async deleteDatabase() {
    //! Delete all items
    await this.itemsRepository.createQueryBuilder().delete().where({}).execute()
    //! Delete all users
    await this.usersRepository.createQueryBuilder().delete().where({}).execute()
  }

  async createData() {
    // * Crear usuarios
    // * Crear Items
  }
}
