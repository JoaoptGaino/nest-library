import { Author, Book } from '@prisma/client';

export class AuthorEntity {
  id: string;
  name: string;

  books: Book[];

  constructor(author: Author, book?: Book[]) {
    this.id = author.id;
    this.name = author.name;
    this.books = book;
  }
}
