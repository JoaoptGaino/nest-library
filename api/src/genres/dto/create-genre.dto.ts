import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: "'name' must be a string" })
  name: string;
}
