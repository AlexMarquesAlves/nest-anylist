import { Injectable } from '@nestjs/common'
import type { User } from './entities/user.entity'

@Injectable()
export class UsersService {
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
