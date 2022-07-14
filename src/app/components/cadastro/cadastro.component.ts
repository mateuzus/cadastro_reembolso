import { ReembolsoTabelaService } from 'src/app/services/reembolso-tabela.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoModalComponent, PoModalAction, PoDialogService, PoSelectOption } from '@po-ui/ng-components';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

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
  colunasCc: Array<any> = []
  dataCc: Array<any> = []
  situacao: Array<PoSelectOption> = [
    { label: 'Pendente', value: '1' },
    { label: 'Aprovado', value: '2' },
    { label: 'Rejeitado', value: '3' }
  ]
  todasDespesas: Array<any> = []

  sit_selecionada: string = ''
  un: string = ''
  centro_custo: string = ''
  cc_selecionado: string = ''
  obs: string = ''
  place_cc: string = 'Clique na lupa para abrir a modal ->'
  tipo_modal: string = ''
  titulo: string = ''
  nome_painel: string = sessionStorage.getItem('login') || ''
  cod_prest: number = 0
  usuario: string = ''
  data: string = ''


  collapsed: boolean = true
  filter: boolean = true
  despesaKm: boolean = false
  isHideLoading: boolean = true

  constructor(private router: Router,
    private reembolsoService: ReembolsoTabelaService,
    private poDialog: PoDialogService,
    private cadastrarService: CadastroService) { }

  ngOnInit(): void {
    this.usuario = this.nome_painel
    this.filtroInicial()
    this.carregarColunas()
    this.carregarCentroCusto()
  }

  private acao_primaria_modal_cc: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      if (this.centro_custo === '') {
        return this.poDialog.alert({ title: 'Atenção', message: 'Selecione um CC para continuar.' })
      }
      this.poModal.close()
    }
  }

  private acao_secundaria_modal_cc: PoModalAction = {
    label: 'Fechar',
    danger: false,
    action: () => {
      this.poModal.close()
    }
  }

  carregarColunas() {
    this.colunasCc = this.reembolsoService.colunasTabelaCc()
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
    this.isHideLoading = false
    let parametros = {
      "cod-prest": this.cod_prest,
      "sc-codigo": this.cc_selecionado,
      "solicitante": this.usuario,
      "ind-sit": this.sit_selecionada,
      "data-prest": this.data
    }

    console.log(parametros)

    this.cadastrarService.cadastrar(parametros, (item: any) => {
      this.isHideLoading = true
      console.log(item)
    })
    this.router.navigate(['/menu'])
  }

  limparCadastro() {
    this.sit_selecionada = ''
    this.un = ''
    this.centro_custo = ''
    this.obs = ''
    this.cod_prest = 0
    this.data = ''
    this.usuario = ''
    this.filtroInicial()
  }

  abrirModalCc() {
    this.titulo = 'Selecione um centro de custo'
    this.tipo_modal = 'cc'
    this.poModal.open()
  }

  acoesPrimarias() {
    let actions: any = {
      cc: this.acao_primaria_modal_cc
    }
    return actions[this.tipo_modal]
  }

  acoesSecundarias() {
    let actions: any = {
      cc: this.acao_secundaria_modal_cc
    }
    return actions[this.tipo_modal]
  }

  linhaSelecionada(row: any) {
    this.centro_custo = `${row['sc-codigo']} - ${row['descricao']}`
    this.cc_selecionado = row['sc-codigo']
  }

  apagarLinhaSelecionada(row: any) {
    this.centro_custo = ''
  }

  carregarCentroCusto() {
    let parametros = {
      "sc-codigo-ini": "00000",
      "sc-codigo-fim": "99999"
    }
    this.reembolsoService.centroCustos(parametros, (item: any) => {
      this.dataCc = item.items[0].ds_cc['tt-cc']
    })
  }

  filtroInicial() {
    this.isHideLoading = false
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
      this.isHideLoading = true
      let retorno = item.items[0].ds_prest['tt-prest-contas']
      let ultimo = retorno[retorno.length - 1]
      this.cod_prest = ultimo['cod-prest'] + 1
    })
  }

}
