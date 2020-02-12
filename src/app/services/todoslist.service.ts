import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { List } from '../model/list';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoslistService {

  private todolistCollection: AngularFirestoreCollection<List>;
  private todos: Observable<Array<List>>;
  // tslint:disable-next-line:no-shadowed-variable
  public listtodos: Array<List>;

  constructor(private db: AngularFirestore) {
    this.todolistCollection = db.collection<List>('todos');
    this.todos = this.todolistCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }));
    this.todos.subscribe(res => {
      this.listtodos = res;

    });
  }

  public get(): Array<List> {
    return this.listtodos;
  }

  public delete(list: List ) {
    return this.todolistCollection.doc(list.id).delete();
  }

add(item: Item) {
    return this.todolistCollection.add(item);
  }

}
