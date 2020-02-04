import { Component, OnInit } from '@angular/core';
import { List } from '../model/list';
import { TodoslistService } from '../services/todoslist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todoslist',
  templateUrl: './todoslist.page.html',
  styleUrls: ['./todoslist.page.scss'],
})
export class TodoslistPage implements OnInit {

  public list: Array<List> = new Array<List>();
  public emptyy = false;
  constructor(private listService: TodoslistService) {

  }

  ngOnInit(): void {
    this.listService.get().subscribe(res => {
      this.list = res;
    });
  }

  delete(pos: number){
    // tslint:disable-next-line:no-shadowed-variable
    this.listService.delete(this.list[pos]);
    this.listService.get();
  }
}

