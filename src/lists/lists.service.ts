import { Injectable, Logger, NotFoundException } from '@nestjs/common'
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

  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listsRepository.findOneBy({
      id,
      user: { id: user.id },
    })
    if (!list) {
      throw new NotFoundException(`List with id: ${id} not found`)
    }

    this.logger.log(`List with ID: ${id} was successfully found`)
    return list
  }

  async update(id: string, updateListInput: UpdateListInput, user: User): Promise<List> {
    await this.findOne(id, user)
    const list = await this.listsRepository.preload({
      ...updateListInput,
      user,
    })

    if (!list) {
      throw new NotFoundException(`List with id: ${id} not found`)
    }

    this.logger.log(`List with ID: ${id} was successfully updated`)
    return await this.listsRepository.save(list)
  }

  async remove(id: string, user: User): Promise<List> {
    // TODO: soft delete, integridad referencial
    const list = await this.findOne(id, user)

    await this.listsRepository.remove(list)
    this.logger.log(`Item with ID: ${id} was successfully removed`)

    return { ...list, id }
  }

  async listCountByUser(user: User): Promise<number> {
    return this.listsRepository.count({
      where: { user: { id: user.id } },
    })
  }
}
