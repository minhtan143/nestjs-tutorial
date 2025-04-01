import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationPayload {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Max(1000)
  limit: number = 10;
}
