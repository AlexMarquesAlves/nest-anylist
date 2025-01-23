import { Injectable } from '@nestjs/common'
import type { UsersService } from 'src/users/users.service'
import type { SignUpInput } from './dto/inputs/signup.input'
import type { AuthResponse } from './types/auth-response.type'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput)
    // TODO: crear JWT
    const token = 'await this.generateToken(user)'

    return { token, user }
  }

  login(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  revalidateToken(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
