import { Book, Genre } from '@prisma/client';
export class GenreEntity {
  id: string;
  name: string;

  books: Book[];

  constructor(genre: Genre, books?: Book[]) {
    this.id = genre.id;
    this.name = genre.name;
    this.books = books;
  }
}
