import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ type: String, description: "Author's name", required: true })
  @IsNotEmpty({ message: "'Name' is required" })
  @IsString({ message: "'name' must be a string" })
  name: string;
}
