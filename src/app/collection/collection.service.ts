import { Injectable } from '@angular/core';

export class Collection {
  constructor(public id: number, public name: string) { }
}

let COLLECTIONS = [
  new Collection(11, 'Mr. Nice'),
  new Collection(12, 'Narco'),
  new Collection(13, 'Bombasto'),
  new Collection(14, 'Celeritas'),
  new Collection(15, 'Magneta'),
  new Collection(16, 'RubberMan')
];

let collectionsPromise = Promise.resolve(COLLECTIONS);

@Injectable()
export class CollectionService {
  getCollections() { return collectionsPromise; }
  
  getCollection(id: number | string) {
    return collectionsPromise
      .then(heroes => heroes.filter(h => h.id === +id)[0]);
  }
}