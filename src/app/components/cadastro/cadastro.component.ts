import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  menus: Array<PoMenuItem> = [
    {
      label: 'Menu',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-menu',
      shortLabel: 'Menu'
    },
    {
      label: 'Logout',
      action: this.logout.bind(this),
      icon: 'po-icon-user-delete',
      shortLabel: 'Logout',
    }
  ];

  tp_despesa: string = ''
  um: string = ''
  centro_custo: string = ''
  obs: string = ''
  vl_unitario: number = 0
  vl_informado: number = 0
  total: number = 0
  quantidade: number = 0

  collapsed: boolean = true
  filter: boolean = true
  name_panel: string = sessionStorage.getItem('login') || ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  printMenuAction(menu: PoMenuItem) {
    this.router.navigate(['/menu'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  salvar() {
    this.limparCadastro()
  }

  confirmar() {
    this.router.navigate(['/menu'])
  }

  limparCadastro() {
    this.tp_despesa = ''
    this.um = ''
    this.centro_custo = ''
    this.obs = ''
    this.vl_unitario = 0
    this.vl_informado = 0
    this.total = 0
    this.quantidade = 0
  }

}
