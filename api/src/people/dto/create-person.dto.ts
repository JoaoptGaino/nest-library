import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: "'name' must be a string" })
  name: string;

  @IsNotEmpty({ message: 'Identification is required' })
  @IsString({ message: "'identification' must be a string" })
  identification: string;

  @IsNotEmpty({ message: 'Blocked is required' })
  @IsString({ message: "'blocked' must be a string" })
  blocked: boolean;
}
