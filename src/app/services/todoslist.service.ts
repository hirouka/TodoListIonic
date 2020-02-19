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
/*    this.todos.subscribe(res => {
      this.listtodos = res;

    });*/
  }

  /**
   * renvoie une liste de todoList
   */
  public get(): Observable< Array<List>> {
    return this.todos;
  }

  /**
   * Supprime une list passée en parametre
   * @param list
   */
  public delete(list: List) {
    console.log('supp');
    console.log(list);
    return this.todolistCollection.doc(list.id).delete();
  }

  /**
   * ajoute une liste
   * @param list
   */
  addList(list : List){
    return this.todolistCollection.add(list);

  }

  /**
   * Ajoute un item dans ???
   * @param item
   */
  addItem(item: Item) {
    return this.todolistCollection.add(item);
  }


  /**
   *
   * @param list
   */
  getItems(list: List) {
    return list.items;
  }

  /**
   *
   * @param list
   */
/*
  getItem(id:number): Observable<Item> {
    return this.getItems()
        .map(items => items.find(item => item.id === id));
  }
*/


}
