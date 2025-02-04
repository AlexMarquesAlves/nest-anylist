import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { CreateItemInput, UpdateItemInput } from './dto/inputs'
import { Item } from './entities/item.entity'

@Injectable()
export class ItemsService {
  private logger = new Logger('ItemsService')

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItem = this.itemsRepository.create({ ...createItemInput, user })

    this.logger.log(`New item "${newItem.name}" was successfully created`)
    return await this.itemsRepository.save(newItem)
  }

  async findAll(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs
  ): Promise<Item[]> {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    const queryBuilder = this.itemsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId: user.id })
    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      })
      this.logger.log(`Searching for all items that includes ${search}`)
    } else {
      this.logger.log(`Searching for all items`)
    }

    return queryBuilder.getMany()
    // return this.itemsRepository.find({ //! Work but is large...
    //   take: limit,
    //   skip: offset,
    //   where: {
    //     user: {
    //       id: user.id
    //     },
    //     name: Like(`%${ search.toLowerCase() }%`)
    //   }
    // });
  }

  async findOne(id: string, user: User): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({
      id,
      user: { id: user.id },
    })
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    // item.user = user
    this.logger.log(`Item with ID: ${id} was successfully found`)
    return item
  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User): Promise<Item> {
    await this.findOne(id, user)
    const item = await this.itemsRepository.preload(updateItemInput)

    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    this.logger.log(`Item with ID: ${id} was successfully updated`)
    return await this.itemsRepository.save(item)
  }

  async remove(id: string, user: User): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const item = await this.findOne(id, user)

    await this.itemsRepository.remove(item)
    this.logger.log(`Item with ID: ${id} was successfully removed`)

    return { ...item, id }
  }

  async itemCountByUser(user: User): Promise<number> {
    return this.itemsRepository.count({
      where: { user: { id: user.id } },
    })
  }
}
