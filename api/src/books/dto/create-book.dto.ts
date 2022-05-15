import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: "'title' must be a string" })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: "'description' must be a string" })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Section is required' })
  @IsString({ message: "'section' must be a string" })
  section: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Author is required' })
  @IsUUID('4', { message: "'authorId' must be a uuid" })
  authorId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Genre is required' })
  @IsUUID('4', { message: "'genreId' must be a uuid" })
  genreId: string;
}
