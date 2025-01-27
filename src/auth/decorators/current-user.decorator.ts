import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { User } from 'src/users/entities/user.entity'
import type { ValidRoles } from '../enums/valid-roles.enum'

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const user: User = ctx.getContext().req.user

    if (!user) {
      throw new InternalServerErrorException(
        `No user inside the request - make sure that we used the AuthGuard`
      )
    }

    if (roles.length === 0) return user

    for (const role of user.roles) {
      // TODO: Eliminar ValidRoles
      if (roles.includes(role as ValidRoles)) {
        return user
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} does not have the required role [${roles}]`
    )
  }
)
