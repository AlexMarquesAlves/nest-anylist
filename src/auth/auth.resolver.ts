import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import type { SignUpInput } from './dto/inputs/signup.input'
import { AuthResponse } from './types/auth-response.type'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'sign-up' })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return this.authService.signUp(signUpInput)
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput)
  }

  // @Query(/** ?? */ { name: 'revalidate' })
  // async revalidateToken(): Promise<unknown> {
  //   return this.authService.revalidateToken()
  // }
}
