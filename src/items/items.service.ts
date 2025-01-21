import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { CreateItemInput, UpdateItemInput } from './dto/inputs'
import { Item } from './entities/item.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const logger = new Logger('Create Service')
    const newItem = this.itemsRepository.create(createItemInput)

    logger.log(` New item "${newItem.name}" was successfully created`)
    return await this.itemsRepository.save(newItem)
  }

  async findAll(): Promise<Item[]> {
    const logger = new Logger('Find All Service')
    // TODO: filtrar, paginar, por usuario...

    logger.log(`Searching for all items`)
    return await this.itemsRepository.find()
  }

  async findOne(id: string): Promise<Item> {
    const logger = new Logger('Find One Service')
    const item = await this.itemsRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    logger.log(`Item with ID: ${id} was successfully found`)
    return item
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const logger = new Logger('Update Service')
    const item = await this.itemsRepository.preload(updateItemInput)
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found`)
    }

    logger.log(`Item with ID: ${id} was successfully updated`)
    return await this.itemsRepository.save(item)
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const logger = new Logger('Remove Service')
    const item = await this.findOne(id)

    await this.itemsRepository.remove(item)
    logger.log(`Item with ID: ${id} was successfully removed`)

    return { ...item, id }
  }
}
