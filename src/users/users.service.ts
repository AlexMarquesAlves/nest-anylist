import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import type { SignUpInput } from 'src/auth/dto/inputs/signup.input'
import type { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('Users Service')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(singUpInput: SignUpInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...singUpInput,
        password: bcrypt.hashSync(singUpInput.password, 10),
      })

      return await this.userRepository.save(newUser)
    } catch (error) {
      this.handleBDErrors(error)
    }
  }

  async findAll(): Promise<User[]> {
    return []
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  block(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  private handleBDErrors(error: any): never {
    this.logger.error(error)

    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''))
    }

    throw new InternalServerErrorException(`Check server logs`)
  }
}
