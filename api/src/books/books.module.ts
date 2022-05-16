import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RentBookService } from './services/rent-book.service';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService, RentBookService],
  exports: [BooksService],
})
export class BooksModule {}
