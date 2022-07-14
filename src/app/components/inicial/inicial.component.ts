import { FiltroComponent } from './../filtro/filtro.component';
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
  @ViewChild(FiltroComponent) filtroComponent!: FiltroComponent

  collapsed: boolean = true
  filter: boolean = true
  

  name_panel: string = sessionStorage.getItem('login') || ''
  tipo_modal: string = ''
  titulo: string = ''
  po_ligado: string = 'Ligado'
  po_desligado: string = 'Desligado'

  @Output() reembolso: number = 0
  @Output() total: number = 0

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
  colunasDescricao: Array<PoTableColumn> = []
  data: Array<any> = []
  dataDescricao: Array<any> = []

  //Variaveis para editar uma despesa
  editarCodPrestacao: number = 0
  editarCodDespesa: number = 0
  editarQtd: number = 0
  editarUn: string = ''
  editarVlUnitario: number = 0
  editarVlTotal: number = 0
  editarData: string = ''
  editarHora: string = ''
  editarObs: string = ''

  constructor(private router: Router,
    private reembolsoService: ReembolsoTabelaService) { }

  ngOnInit(): void {
    this.carregarColunas()
    this.filtroInicial()

    /* let url = new URL(window.location.href);
    console.log(url) */
  }

  carregarColunas() {
    this.colunasTabela = this.reembolsoService.colunasTabelaReembolso()
    this.colunasDescricao = this.reembolsoService.colunasTabelaDescricao(this)
  }

  printMenuAction() {
    this.router.navigate(['/cadastro'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  //Ações primárias

  private acao_primaria_confirmar_editar: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      console.log('Confirmar')
    }
  }

  private acao_primaria_confirmar_filtro: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      this.filtro()
      this.poModal.close()
    }
  }

  //ações secundárias

  private acao_secundaria_fechar: PoModalAction = {
    label: 'Fechar',
    danger: true,
    action: () => {
      this.poModal.close()
    }
  }

  acoesPrimarias() {
    let actions: any = {
      editar: this.acao_primaria_confirmar_editar,
      filtro: this.acao_primaria_confirmar_filtro
    }
    return actions[this.tipo_modal]
  }

  acoesSecundarias() {
    let actions: any = {
      editar: this.acao_secundaria_fechar,
      filtro: this.acao_secundaria_fechar
    }
    return actions[this.tipo_modal]
  }

  irListView(evento: any): any {
    if (evento === true) {
      return this.router.navigate(['/list-view'])
    }
  }

  addItemTabela() {
    this.dataDescricao = this.dataDescricao.map((item: any) => {
      item["actions"] = ["deletar", "editar"]
      return item
    })
  }

  editar(linha: any) {
    this.editarCodPrestacao = linha["cod-prest"]
    this.editarCodDespesa = linha["cod-desp"]
    this.editarQtd = linha["quantidade"]
    this.editarUn = linha["un"]
    this.editarVlUnitario = linha["vl-unit-pad"]
    this.editarVlTotal = linha["vl-tot"]
    this.editarData = linha["data"]
    this.editarHora = linha["hora"]
    this.editarObs = linha["observacoes"]
    this.titulo = 'Editar'
    this.tipo_modal = 'editar'
    this.poModal.open()
  }

  deletar(linha: any) {
    let total = this.total
    this.data = this.data.filter((item: any) => {
      let valorTotal = item['valor-total']
      total -= valorTotal
      this.total = total
      return item != linha
    })
  }

  carregarPrestContas() {
  }

  abrirModalFiltro() {
    this.titulo = 'Filtro'
    this.tipo_modal = 'filtro'
    this.poModal.open()
  }

  abrirModalCadastrar() {
    this.titulo = 'Cadastrar'
    this.tipo_modal = 'cadastrar'
    this.poModal.open()
  }

  filtroInicial() {
    let parametros = {
      "codigo-ini": 0,
      "codigo-fim": 999999,
      "dt-prest-ini": "2021-01-01",
      "dt-prest-fim": "9999-12-31",
      "sol-ini": "",
      "sol-fim": "ZZZZZZZZZ",
      "sit-ini": 1,
      "sit-fim": 3
    }
    this.reembolsoService.prestContas(parametros, (item: any) => {
      this.data = item.items[0].ds_prest['tt-prest-contas']
    })
  }

  filtro() {
    let parametros = {
      "codigo-ini": this.filtroComponent.codIni,
      "codigo-fim": this.filtroComponent.codFim,
      "dt-prest-ini": this.filtroComponent.dataPrestIni,
      "dt-prest-fim": this.filtroComponent.dataPrestFim,
      "sol-ini": this.filtroComponent.solicitacaoIni,
      "sol-fim": this.filtroComponent.solicitacaoFim,
      "sit-ini": this.filtroComponent.situacaoIni,
      "sit-fim": this.filtroComponent.situacaoFim
    }
    this.reembolsoService.prestContas(parametros, (item: any) => {
      this.data = item.items[0].ds_prest['tt-prest-contas']
    })
  }

  linhaSelecionada(linha: any) {
    this.dataDescricao = linha['tt-prest-contas-desp']
    this.addItemTabela()
  }

  limparDataDescricao() {
    this.dataDescricao = []
  }
}


