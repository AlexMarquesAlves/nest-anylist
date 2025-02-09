import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationArgs, SearchArgs } from '../common/dto/args'
import { List } from '../lists/entities/list.entity'
import { CreateListItemInput } from './dto/create-list-item.input'
import { UpdateListItemInput } from './dto/update-list-item.input'
import { ListItem } from './entities/list-item.entity'

@Injectable()
export class ListItemService {
  private logger = new Logger('ListItemService')

  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>
  ) {}

  async create(createListItemInput: CreateListItemInput) {
    const { itemId, listId, ...rest } = createListItemInput
    const newListItem = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    })

    this.logger.log(`New list item "${newListItem.id}" was successfully created`)
    return this.listItemRepository.save(newListItem)
  }

  async findAll(list: List, paginationArgs: PaginationArgs, searchArgs: SearchArgs) {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    const queryBuilder = this.listItemRepository
      .createQueryBuilder('listItem')
      .innerJoin('listItem.item', 'item')
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id })
    if (search) {
      queryBuilder.andWhere('LOWER(item.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      })
      this.logger.log(`Searching for all items that includes ${search}`)
    } else {
      this.logger.log(`Searching for all items`)
    }

    return queryBuilder.getMany()
  }

  async countListItemByList(list: List): Promise<number> {
    return this.listItemRepository.count({ where: { id: list.id } })
  }

  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id })

    if (!listItem) {
      this.logger.error(`ListItem with id ${id} not found`)
    }

    this.logger.log(`Looking for list item with id: ${id}`)
    return listItem
  }

  update(id: number, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`
  }
}
