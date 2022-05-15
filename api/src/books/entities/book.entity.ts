import { Author, Book, Genre } from '.prisma/client';

export class BookEntity {
  id: string;
  title: string;
  description: string;
  section: string;
  authorId: string;
  genreId: string;
  available: boolean;

  author: Author;
  genre: Genre;

  constructor(book: Book, author?: Author, genre?: Genre) {
    this.id = book.id;
    this.title = book.title;
    this.description = book.description;
    this.section = book.section;
    this.authorId = book.authorId;
    this.genreId = book.genreId;
    this.available = book.avaiable;
    this.author = author;
    this.genre = genre;
  }
}
