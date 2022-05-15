import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateBookDto {
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
  @IsUUID('4', { message: "'authorId' must be a uuid" })
  authorId?: string;

  @IsOptional()
  @IsUUID('4', { message: "'genreId' must be a uuid" })
  genreId?: string;
}
