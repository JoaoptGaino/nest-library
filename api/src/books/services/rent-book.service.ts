import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { transformDatetimeToDate } from '../../utils/date-formatters';
import { PrismaService } from '../../prisma/services/prisma.service';
import { RentBookDto } from '../dto/rent-book.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class RentBookService {
  constructor(private readonly prismaService: PrismaService) {}

  async rent(bookId: string, { days, personId }: RentBookDto) {
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

  async return(bookId: string) {
    const date = transformDatetimeToDate(new Date());

    const book = await this.prismaService.personBookRent.findFirst({
      where: { bookId },
    });

    if (date > book.expireDay) {
      const daysDiference = date.getDate() - book.expireDay.getDate();

      await this.prismaService.person.update({
        where: { id: book.personId },
        data: {
          blocked: true,
        },
      });

      const personBookRent = await this.prismaService.personBookRent.update({
        where: { id: book.id },
        data: {
          fine: 0.75 * daysDiference,
        },
      });

      throw new BadRequestException({
        message: 'Book is overdue',
        fine: personBookRent.fine,
      });
    }

    const bookReturned = await this.prismaService.book.update({
      where: { id: bookId },
      data: {
        avaiable: true,
      },
    });

    return {
      message: `Book ${bookReturned.title} has been returned`,
    };
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
