import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  menus: Array<PoMenuItem> = [
    {
      label: 'Cadastrar',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-edit',
      shortLabel: 'Cadastrar'
    },
    {
      label: 'Logout',
      action: this.logout.bind(this),
      icon: 'po-icon-user-delete',
      shortLabel: 'Logout',
    }
  ];
  collapsed: boolean = true
  filter: boolean = true
  po_switch: boolean = true

  name_panel: string = sessionStorage.getItem('login') || ''
  po_ligado: string = 'Ligado'
  po_desligado: string = 'Desligado'

  @Output() reembolso: number = 0
  @Output() total: number = 0

  data: Array<any> = [
    {
      "solicitacao": '12405',
      "solicitante": 'datasul',
      "descricao": 'teste',
      'vl_unit': 1.50,
      'um': 'KM',
      'vl_total': 1.50,
      'observacao': 'blablablablabla'
    },
    {
      "solicitacao": '13902',
      "solicitante": 'mateus',
      "descricao": 'teste',
      'vl_unit': 1.90,
      'um': 'KM',
      'vl_total': 1.90,
      'observacao': 'blablablablabla'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  printMenuAction() {
    this.router.navigate(['/cadastro'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  showDetail(item: any) {
    console.log(item)
    return item.observacao;
  }

  irListView(evento: any): any {
    if (evento === false) {
      return this.router.navigate(['/menu'])
    }
  }

}
