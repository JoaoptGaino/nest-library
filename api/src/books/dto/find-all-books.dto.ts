import { Prisma } from '.prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto';

export class FindAllBooksDto extends PaginationQueryDto<Prisma.BookOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'title' must be a string" })
  title?: string;

  @IsOptional()
  @IsString({ message: "'description' must be a string" })
  description?: string;

  @IsOptional()
  @IsString({ message: "'section' must be a string" })
  section?: string;

  @IsOptional()
  @IsBoolean({ message: "'author' must be a string" })
  @Transform(({ value }) => value === 'true')
  avaiable?: boolean;

  @IsOptional()
  @IsString({ message: "'author' must be a string" })
  authorId?: string;

  @IsOptional()
  @IsString({ message: "'genre' must be a string" })
  genreId?: string;
}
