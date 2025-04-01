import { PaginationPayload } from '@common/dto/pagination.payload';
import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  items: T[];

  constructor(page: number, limit: number, total: number, items: T[]) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.items = items;
  }

  static from<T, P extends PaginationPayload>(
    items: T[],
    total: number,
    payload: P,
  ): Pagination<T> {
    return new Pagination(payload.page, payload.limit, total, items);
  }
}
