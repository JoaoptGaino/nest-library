import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [GenresModule, AuthorsModule, BooksModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
