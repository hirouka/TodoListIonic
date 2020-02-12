import { Component, OnInit } from '@angular/core';
import { List } from '../model/list';
import { TodoslistService } from '../services/todoslist.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {NavController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-todoslist',
  templateUrl: './todoslist.page.html',
  styleUrls: ['./todoslist.page.scss'],
})
export class TodoslistPage implements OnInit {
  a: string;
  validationsform: FormGroup;
  errorMessage = '';
  public list: Array<List> = new Array<List>();
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
  logOut(){
    this.authservice.logoutUser()
        .then(res => {
          this.authservice.authenticated = false;
          console.log('byebye');
          console.log(res);
          this.errorMessage = '';
          this.navCtrl.navigateForward('');
        }, err => {
          this.errorMessage = err.message;
        });

  }
  delete(pos: number) {
    // tslint:disable-next-line:no-shadowed-variable
    this.listService.delete(this.list[pos]);
    this.listService.get();
  }
}

