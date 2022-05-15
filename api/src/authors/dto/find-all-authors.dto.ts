import { Prisma } from '.prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto';

export class FindAllAuthorsDto extends PaginationQueryDto<Prisma.AuthorOrderByWithRelationInput> {
  @ApiPropertyOptional({
    type: String,
    description: "Author's name",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;
}
