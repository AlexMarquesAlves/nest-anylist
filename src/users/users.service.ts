import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity'

import { UpdateUserInput } from './dto/update-user.input'

import { InjectRepository } from '@nestjs/typeorm'
import type { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { Repository } from 'typeorm'
import { SignupInput } from '../auth/dto/inputs/signup.input'

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

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0)
      return this.usersRepository.find({
        // relations: { lastUpdateBy: true }, //! Ya no es necesario por tener la propriedad lazy en lastUpdateBy
      })

    // ??? tenemos roles ['admin', 'superUser']
    return this.usersRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany()
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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
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
