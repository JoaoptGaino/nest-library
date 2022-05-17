import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "'identification' must be a string" })
  identification?: string;

  @IsOptional()
  @IsBoolean({ message: "'blocked' must be a boolean" })
  blocked?: boolean;
}
