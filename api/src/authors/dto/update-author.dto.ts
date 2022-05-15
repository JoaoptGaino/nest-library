import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiPropertyOptional({
    type: String,
    description: "Author's name",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name: string;
}
