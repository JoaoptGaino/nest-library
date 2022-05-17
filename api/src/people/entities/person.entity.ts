import { Person, PersonBookRent } from '.prisma/client';

export class PersonEntity {
  id: string;

  name: string;
  identification: string;
  blocked: boolean;

  personBookRent: PersonBookRent[];

  constructor(people: Person, personBookRent?: PersonBookRent[]) {
    this.id = people.id;
    this.name = people.name;
    this.identification = people.identification;
    this.blocked = people.blocked;
    this.personBookRent = personBookRent;
  }
}
