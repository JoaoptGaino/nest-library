import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { transformDatetimeToDate } from '../../utils/date-formatters';
import { PrismaService } from '../../prisma/services/prisma.service';
import { RentBookDto } from '../dto/rent-book.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class RentBookService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(bookId: string, { days, personId }: RentBookDto) {
    try {
      await this.validateBook(bookId);

      const book = await this.prismaService.book.update({
        where: { id: bookId },
        data: { avaiable: false },
      });

      const rentedDay = transformDatetimeToDate(new Date());

      await this.prismaService.personBookRent.create({
        data: {
          bookId,
          personId,
          rentedDay,
          expireDay: this.getDateToReturn(rentedDay, days),
        },
      });

      return new BookEntity(book);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  getDateToReturn(rentDate: Date, days: number) {
    const dateToReturn = new Date(rentDate);
    dateToReturn.setDate(rentDate.getDate() + days);
    return dateToReturn;
  }

  async validateBook(id: string) {
    const { avaiable } = await this.prismaService.book.findUnique({
      where: { id },
    });

    if (!avaiable) {
      throw new InternalServerErrorException('Book is not available');
    }
  }
}
