import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class SearchArg {
  constructor() {}

  search?: string
}
