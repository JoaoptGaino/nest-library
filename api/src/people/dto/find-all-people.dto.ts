import { Person, PersonBookRent, Prisma } from '.prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto';

export class FindAllPeopleDto extends PaginationQueryDto<Prisma.PersonOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  identification?: string;

  @IsOptional()
  @IsBoolean({ message: "'blocked' must be a boolean" })
  @Transform(({ value }) => value === 'true')
  blocked?: boolean;
}
