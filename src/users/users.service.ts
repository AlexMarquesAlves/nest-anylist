import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { SignUpInput } from 'src/auth/dto/inputs/signup.input'
import type { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(singUpInput: SignUpInput): Promise<User> {
    try {
      const newUser = this.userRepository.create(singUpInput)
      return await this.userRepository.save(newUser)
    } catch (error) {
      throw new BadRequestException(error)
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
}
