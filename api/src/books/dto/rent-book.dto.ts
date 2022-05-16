import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RentBookDto {
  @IsNotEmpty({ message: 'Person id is required' })
  @IsUUID(4, { message: "'personId' must be a valid uuid" })
  personId: string;

  @IsNotEmpty({ message: 'Days are required' })
  @IsNumber({}, { message: "'days' must be a number" })
  days: number;
}
