import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGuard} from './services/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: 'authent', pathMatch: 'full' },
  {
    path: 'todoslist',
    loadChildren: () => import('./todoslist/todoslist.module').then( m => m.TodoslistPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'addtodo',
    loadChildren: () => import('./addtodo/addtodo.module').then( m => m.AddtodoPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'authent',
    loadChildren: () => import('./authent/authent.module').then( m => m.AuthentPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'addlisttodo',
    loadChildren: () => import('./addlisttodo/addlisttodo.module').then( m => m.AddlisttodoPageModule)
  },
  {
    path: 'todo-item',
    loadChildren: () => import('./todo-item/todo-item.module').then( m => m.TodoItemPageModule)
  },
  {
    path: 'additem',
    loadChildren: () => import('./additem/additem.module').then( m => m.AdditemPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
