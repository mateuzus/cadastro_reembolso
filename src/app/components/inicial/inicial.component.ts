import { Component, Output, OnInit, ViewChild } from '@angular/core';
import { PoMenuItem, PoModalAction, PoModalComponent, PoTableColumn } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { ReembolsoTabelaService } from 'src/app/services/reembolso-tabela.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  @ViewChild(PoModalComponent) poModal!: PoModalComponent

  collapsed: boolean = true
  filter: boolean = true

  name_panel: string = sessionStorage.getItem('login') || ''
  modal_type: string = ''
  title: string = ''
  po_ligado: string = 'Ligado'
  po_desligado: string = 'Desligado'

  @Output() reembolso: number = 0
  @Output() total: any

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
  colunasTabela: Array<PoTableColumn> = []
  data: Array<any> = [
    {
      'id': '01',
      'cod-despesa': '10',
      'quantidade': '3',
      'um': 'KM',
      'valor-unitario': 'R$ 1,20',
      'valor-total': 3.60,
      'centro-custo': '1.2',
      'user': 'datasul',
      'observacoes': 'Km rodados para ir ao cliente'
    },
    {
      'id': '02',
      'cod-despesa': '10',
      'quantidade': '3',
      'um': 'KM',
      'valor-unitario': 'R$ 2,20',
      'valor-total': 6.60,
      'centro-custo': '2.5',
      'user': 'datasul',
      'observacoes': 'Km rodados para ir ao cliente em Fortaleza'
    }
  ]

  constructor(private router: Router,
    private reembolsoService: ReembolsoTabelaService) { }

  ngOnInit(): void {
    this.carregarColunas()
    this.calculoReembolsos()
    this.addItemTabela()
  }

  carregarColunas() {
    this.colunasTabela = this.reembolsoService.colunasTabelaReembolso(this)
  }

  printMenuAction() {
    this.router.navigate(['/cadastro'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  openModal() {
    this.modal_type = 'cadastro'
    this.title = 'Cadastro de reembolso'
    this.poModal.open()
  }

  //Ações primárias

  private primary_action_confirm_cadastro: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      console.log('Confirmar')
    }
  }

  //ações secundárias

  private secondary_action_confirm_cadastro: PoModalAction = {
    label: 'Fechar',
    danger: true,
    action: () => {
      this.poModal.close()
    }
  }

  primaryActions() {
    let actions: any = {
      cadastro: this.primary_action_confirm_cadastro
    }
    return actions[this.modal_type]
  }

  secondaryActions() {
    let actions: any = {
      cadastro: this.secondary_action_confirm_cadastro
    }
    return actions[this.modal_type]
  }

  irListView(evento: any): any {
    if (evento === true) {
      return this.router.navigate(['/list-view'])
    }
  }

  calculoReembolsos() {
    let totalData = this.data.length
    this.reembolso = totalData
    let total = 0

    let filtro = this.data.map((item: any) => {
      let valorTotal = item['valor-total']
      total += valorTotal
      this.total = total
      this.total = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      return this.total
    })
    console.log(filtro)
  }

  addItemTabela() {
    this.data = this.data.map((item: any) => {
      item["actions"] = ["deletar", "editar"]
      return item
    })
  }

  editar(linha: any) { }

  deletar(linha: any) {
    let total = this.total
    this.data = this.data.filter((item: any) => {
      let valorTotal = item['valor-total']
      total -= valorTotal
      this.total = total
      return item != linha
    })
  }
}


