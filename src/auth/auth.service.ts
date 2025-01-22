import { Injectable, Logger } from '@nestjs/common'
import type { SignUpInput } from './dto/inputs/signup.input'
import type { AuthResponse } from './types/auth-response.type'

@Injectable()
export class AuthService {
  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const logger = new Logger('Sign up')
    logger.log('sign up input')
    throw new Error('Method not implemented.')

    // return {
    //   token: '',
    //   user: new User(),
    // }
  }

  login(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  revalidateToken(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
