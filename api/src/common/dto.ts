import { Exclude, Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional } from 'class-validator';

export function getPaginationQueryData<T>(
  paginationQueryDto: PaginationQueryDto<T>,
) {
  return {
    take: paginationQueryDto.take ?? paginationQueryDto.limit,
    skip: paginationQueryDto.skip,
    orderBy: paginationQueryDto.sort,
  };
}

export abstract class PaginationQueryDto<T> {
  @IsOptional()
  @IsInt({ message: "'skip' deve ser um número" })
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsInt({ message: "'take' deve ser um número" })
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt({ message: "'limit' deve ser um número" })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsObject({ message: "'sort' deve ser um objeto" })
  sort?: T;

  @Exclude()
  page?: number;
}
