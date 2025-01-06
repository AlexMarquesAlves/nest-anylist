import { IsOptional, IsPositive } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  // transformer
  limit?: number

  @IsOptional()
  @IsPositive()
  offset?: number
}
