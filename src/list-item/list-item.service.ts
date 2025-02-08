import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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

  async findAll() {
    return this.listItemRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} listItem`
  }

  update(id: number, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`
  }
}
