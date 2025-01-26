import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import type { LoginInput, SignUpInput } from './dto/inputs'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthResponse } from './types/auth-response.type'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<AuthResponse> {
    return this.authService.signUp(signupInput)
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput)
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser() user: User): Promise<AuthResponse> {
    // return this.authService.revalidateToken(  )
    console.log('revalidateToken, user:', user)
    throw new Error('No implementado')
  }
}
