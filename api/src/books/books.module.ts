import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
