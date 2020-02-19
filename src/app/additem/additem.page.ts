import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { TodoslistService } from '../services/todoslist.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  title: string;

  constructor(private listService: TodoslistService,
              private router: Router) { }
  ngOnInit() {
  }

  addItem() {
/*    const item = { title: this.title } as Item;
    this.listService.add(item);
    this.router.navigate(['/todo-item']);*/
  }
  retourPagetodo() {
    window.history.back();
  }

}
