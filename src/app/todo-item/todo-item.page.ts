import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {List} from '../model/list';
import {TodoslistService} from '../services/todoslist.service';
import {AuthService} from '../auth.service';
import {NavController} from '@ionic/angular';
import {Item} from '../model/item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.page.html',
  styleUrls: ['./todo-item.page.scss'],
})
export class TodoItemPage implements OnInit {

  a: string;
  validationsform: FormGroup;
  errorMessage = '';
  public list: Array<Item> = new Array<Item>();
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private listService: TodoslistService, private authservice: AuthService,  private navCtrl: NavController
  ) {
    this.a = this.authservice.a;
  }

  ngOnInit(): void {
  }

  getList() {
    return this.listService.get();
  }
  // RETOUR LIST DE ITEMS
  getItems() {
      console.log(this.getList()[1]);
    return this.listService.getItems(this.getList()[1]);
  }

  delete(pos: number) {
    // tslint:disable-next-line:no-shadowed-variable
    this.listService.delete(this.list[pos]);
    this.listService.get();
  }

}
