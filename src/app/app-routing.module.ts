import { ListViewComponent } from './components/list-view/list-view.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: InicialComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'list-view', component: ListViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
