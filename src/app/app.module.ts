import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { InicialComponent } from './components/inicial/inicial.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { WidgetComponent } from './components/widget/widget.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { CadastroDetalhesComponent } from './components/cadastro-detalhes/cadastro-detalhes.component';
import { EditarComponent } from './components/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicialComponent,
    CadastroComponent,
    ListViewComponent,
    WidgetComponent,
    FiltroComponent,
    CadastroDetalhesComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([]),
    PoTemplatesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
