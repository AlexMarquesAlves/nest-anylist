import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationArgs, SearchArgs } from 'src/common/dto/args'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateListInput } from './dto/create-list.input'
import { UpdateListInput } from './dto/update-list.input'
import { List } from './entities/list.entity'

@Injectable()
export class ListsService {
  private logger = new Logger('ListsService')

  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>
  ) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    const newList = this.listsRepository.create({ ...createListInput, user })

    this.logger.log(`New list "${newList.name}" was successfully created`)
    return await this.listsRepository.save(newList)
  }

  async findAll(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs
  ): Promise<List[]> {
    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    const queryBuilder = this.listsRepository
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
  }

  findOne(id: number) {
    return `This action returns a #${id} list`
  }

  update(id: number, updateListInput: UpdateListInput) {
    return `This action updates a #${id} list`
  }

  remove(id: number) {
    return `This action removes a #${id} list`
  }
}
