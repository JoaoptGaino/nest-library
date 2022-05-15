import { Prisma } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto';

export class FindAllGenresDto extends PaginationQueryDto<Prisma.GenreOrderByWithRelationInput> {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;
}
