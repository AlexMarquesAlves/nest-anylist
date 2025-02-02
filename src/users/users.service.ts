import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { SignupInput } from '../auth/dto/inputs/signup.input'
import { ValidRoles } from '../auth/enums/valid-roles.enum'
import { PaginationArgs, SearchArgs } from '../common/dto/args'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      })

      return await this.usersRepository.save(newUser)
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(
    roles: ValidRoles[],
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs
  ): Promise<User[]> {
    const { offset, limit } = paginationArgs
    const { search } = searchArgs

    if (roles.length === 0) {
      const queryBuilderWithZeroRoles = this.usersRepository
        .createQueryBuilder()
        .take(limit)
        .skip(offset)

      if (search) {
        queryBuilderWithZeroRoles.andWhere('LOWER("fullName") like :fullName', {
          fullName: `%${search.toLowerCase()}%`,
        })
        this.logger.log(`Searching for all users that includes ${search}`)
      } else {
        this.logger.log(`Searching for all users`)
      }

      return queryBuilderWithZeroRoles.getMany()
    }

    // ??? tenemos roles ['admin', 'superUser']
    const queryBuilderWithRoles = this.usersRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)

    if (search) {
      queryBuilderWithRoles.andWhere('LOWER("fullName") like :fullName', {
        fullName: `%${search.toLowerCase()}%`,
      })
      this.logger.log(`Searching for all users that includes ${search}`)
    } else {
      this.logger.log(`Searching for all users`)
    }
    return queryBuilderWithRoles.getMany()
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
      throw new NotFoundException(`${email} not found`)

      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } not found`
      // });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${id} not found`)
    }
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    updateBy: User
  ): Promise<User> {
    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id,
      })

      user.lastUpdateBy = updateBy

      return await this.usersRepository.save(user)
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async block(id: string, adminUser: User): Promise<User> {
    const userToBlock = await this.findOneById(id)

    userToBlock.isActive = false
    userToBlock.lastUpdateBy = adminUser
    return await this.usersRepository.save(userToBlock)
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''))
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''))
    }

    this.logger.error(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
