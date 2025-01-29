import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import type { Repository } from 'typeorm'
import { CreateItemInput, UpdateItemInput } from './dto/inputs'
import { Item } from './entities/item.entity'

const logger = new Logger('ItemsService')

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItem = this.itemsRepository.create({ ...createItemInput, user })

    logger.log(` New item "${newItem.name}" was successfully created`)
    return await this.itemsRepository.save(newItem)
  }

  async findAll(user: User): Promise<Item[]> {
    // TODO: filtrar, paginar, por usuario...
    logger.log(`Searching for all items`)

    return await this.itemsRepository.find({
      where: { user: { id: user.id } },
    })
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    logger.log(`Item with ID: ${id} was successfully found`)
    return item
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput)
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    logger.log(`Item with ID: ${id} was successfully updated`)
    return await this.itemsRepository.save(item)
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, integridad referencial

    const item = await this.findOne(id)

    await this.itemsRepository.remove(item)
    logger.log(`Item with ID: ${id} was successfully removed`)

    return { ...item, id }
  }
}
