import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { TodoslistService } from '../services/todoslist.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {

  title: string;

  constructor(private listService: TodoslistService,
              private router: Router) { }

  ngOnInit() {
  }

  addList() {
    const item = { title: this.title } as Item;
    this.listService.add(item);
    this.router.navigate(['/todoslist']);
  }
  retourPagetodo() {
    window.history.back();
  }
}
