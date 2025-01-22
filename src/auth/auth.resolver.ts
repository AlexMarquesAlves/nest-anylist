import { Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(/* ??? */ { name: 'sign-up' })
  async signUp(): Promise<unknown> {
    return this.authService.signUp()
  }

  // @Mutation(/* ??? */ { name: 'login' })
  // async login(): Promise<unknown> {
  //   return this.authService.login()
  // }

  // @Query(/** ?? */ { name: 'revalidate' })
  // async revalidateToken(): Promise<unknown> {
  //   return this.authService.revalidateToken()
  // }
}
