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
  navigate: any;

    validationsform: FormGroup;
  errorMessage = '';
  public list: Array<List> = new Array<List>();
  public Listtodos: any;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private listService: TodoslistService, private authservice: AuthService,  private navCtrl: NavController
  ) {
    this.a = this.authservice.a;
    this.Listtodos = this.listService.get();



  }

  ngOnInit(): void {
      console.log(this.listService.get());
      this.Listtodos = this.listService.get();
  }
    getList() {
        return this.listService.get();
    }
  logOut() {
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
      this.listService.delete(this.getList()[pos]);
      this.listService.get();
  }
}

