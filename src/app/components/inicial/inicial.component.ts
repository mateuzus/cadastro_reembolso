import { FiltroComponent } from './../filtro/filtro.component';
import { Component, Output, OnInit, ViewChild } from '@angular/core';
import {
  PoMenuItem,
  PoModalAction,
  PoModalComponent,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { ReembolsoTabelaService } from 'src/app/services/reembolso-tabela.service';
import { CadastroDetalhesComponent } from '../cadastro-detalhes/cadastro-detalhes.component';
import { CadastroService } from '../../services/cadastro.service';
import { PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  @ViewChild(PoModalComponent) poModal!: PoModalComponent;
  @ViewChild(FiltroComponent) filtroComponent!: FiltroComponent;
  @ViewChild(CadastroDetalhesComponent)
  cadastroDetalhes!: CadastroDetalhesComponent;

  collapsed: boolean = true;
  filter: boolean = true;
  btnCadastrar: boolean = true;

  name_panel: string = sessionStorage.getItem('login') || '';
  tipo_modal: string = '';
  titulo: string = '';
  po_ligado: string = 'Ligado';
  po_desligado: string = 'Desligado';

  @Output() reembolso: number = 0;
  @Output() total: number = 0;

  menus: Array<PoMenuItem> = [
    {
      label: 'Cadastrar Tipo/Situação',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-edit',
      shortLabel: 'Cadastrar',
    },
    {
      label: 'Logout',
      action: this.logout.bind(this),
      icon: 'po-icon-user-delete',
      shortLabel: 'Logout',
    },
  ];
  colunasTabela: Array<PoTableColumn> = [];
  colunasDescricao: Array<PoTableColumn> = [];
  dataReembolso: Array<any> = [];
  dataDescricao: Array<any> = [];

  //Variaveis para editar uma despesa
  editarCodPrestacao: number = 0;
  editarCodDespesa: number = 0;
  editarQtd: number = 0;
  editarUn: string = '';
  editarVlUnitario: number = 0;
  editarVlTotal: number = 0;
  editarData: string = '';
  editarHora: string = '';
  editarObs: string = '';

  //Variaveis de código de prestação e hora
  @Output() cod_prest: number = 0;
  @Output() hora: string = '';

  //Variaiveis para soma de reembolso
  @Output() total_reembolso: string = '0';
  @Output() quantidade_reembolso: number = 0;

  constructor(
    private router: Router,
    private reembolsoService: ReembolsoTabelaService,
    private cadastroService: CadastroService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit(): void {
    this.carregarColunas();
    this.filtroInicial();

    let url = new URL(window.location.href);
    console.log(url)
  }

  carregarColunas() {
    this.colunasTabela = this.reembolsoService.colunasTabelaReembolso(this);
    this.colunasDescricao = this.reembolsoService.colunasTabelaDescricao(this);
  }

  printMenuAction() {
    this.router.navigate(['/cadastro']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  //Ações primárias

  private acao_primaria_confirmar_editar: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      console.log('Confirmar');
    },
  };

  private acao_primaria_confirmar_filtro: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      this.filtro();
      this.poModal.close();
    },
  };

  private acao_primaria_confirmar_cadastro_detalhes: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      this.cadastrarReembolso();
    },
  };

  //ações secundárias

  private acao_secundaria_fechar: PoModalAction = {
    label: 'Fechar',
    danger: true,
    action: () => {
      this.poModal.close();
    },
  };

  acoesPrimarias() {
    let actions: any = {
      editardetalhe: this.acao_primaria_confirmar_editar,
      filtro: this.acao_primaria_confirmar_filtro,
      cadastrardetalhe: this.acao_primaria_confirmar_cadastro_detalhes,
    };
    return actions[this.tipo_modal];
  }

  acoesSecundarias() {
    let actions: any = {
      editardetalhe: this.acao_secundaria_fechar,
      filtro: this.acao_secundaria_fechar,
      cadastrardetalhe: this.acao_secundaria_fechar,
    };
    return actions[this.tipo_modal];
  }

  irListView(evento: any): any {
    if (evento === true) {
      return this.router.navigate(['/list-view']);
    }
  }

  addItemTabela() {
    this.dataDescricao = this.dataDescricao.map((item: any) => {
      item['actions'] = ['deletar', 'editar'];
      return item;
    });
  }

  addItemTabelaReembolso() {
    this.dataReembolso = this.dataReembolso.map((item: any) => {
      item['actions'] = ['deletar', 'editar']
      return item
    })
  }

  abrirModalEditarDetalhes(linha: any) {
    this.editarCodPrestacao = linha['cod-prest'];
    this.editarCodDespesa = linha['cod-desp'];
    this.editarQtd = linha['quantidade'];
    this.editarUn = linha['un'];
    this.editarVlUnitario = linha['vl-unit-pad'];
    this.editarVlTotal = linha['vl-tot'];
    this.editarData = linha['data'];
    this.editarHora = linha['hora'];
    this.editarObs = linha['observacoes'];
    this.titulo = 'Editar';
    this.tipo_modal = 'editardetalhe';
    this.poModal.open();
  }

  abrirModalEditarReembolso(linha: any) {
    console.log(linha)
    this.titulo = `Editar reembolso ${linha['cod-prest']}`
    this.tipo_modal = 'editarreembolso'
  }

  deletarDetalhes(linha: any) {
    console.log(linha)
  }

  deletarReembolso(linha: any) {
    console.log(linha)
    let parametros = {
      'metodo': 3,
      'tt-prest-contas': [
        {
          'cod-prest': linha['cod-prest'],
          'sc-codigo': linha['sc-codigo'],
          'solicitante': linha['solicitante'],
          'ind-sit': linha['ind-sit'],
          'data-prest': linha['data-prest'],
        },
      ],
    };

    this.cadastroService.cadastrarTipoSituacao(
      parametros,
      async (item: any) => {
        let mensagem = item.items[0].ds_prest['tt-ret'][0]['c-DESC'];
        await this.poDialog.alert({ title: 'Atenção', message: mensagem });
        this.filtroInicial()
      }
    );
  }

  abrirModalFiltro() {
    this.titulo = 'Filtro';
    this.tipo_modal = 'filtro';
    this.poModal.open();
  }

  abrirModalCadastrar() {
    this.titulo = 'Cadastrar';
    this.tipo_modal = 'cadastrardetalhe';
    this.atualizaHora();
    this.poModal.open();
  }

  filtroInicial() {
    let parametros = {
      'codigo-ini': 0,
      'codigo-fim': 999999,
      'dt-prest-ini': '2021-01-01',
      'dt-prest-fim': '9999-12-31',
      'sol-ini': '',
      'sol-fim': 'ZZZZZZZZZ',
      'sit-ini': 1,
      'sit-fim': 3,
    };
    this.reembolsoService.prestContas(parametros, (item: any) => {
      this.dataReembolso = item.items[0].ds_prest['tt-prest-contas'];
      this.addItemTabelaReembolso()
    });
  }

  filtro() {
    let parametros = {
      'codigo-ini': this.filtroComponent.codIni,
      'codigo-fim': this.filtroComponent.codFim,
      'dt-prest-ini': this.filtroComponent.dataPrestIni,
      'dt-prest-fim': this.filtroComponent.dataPrestFim,
      'sol-ini': this.filtroComponent.solicitacaoIni,
      'sol-fim': this.filtroComponent.solicitacaoFim,
      'sit-ini': this.filtroComponent.situacaoIni,
      'sit-fim': this.filtroComponent.situacaoFim,
    };
    this.reembolsoService.prestContas(parametros, (item: any) => {
      this.dataReembolso = item.items[0].ds_prest['tt-prest-contas'];
    });
    this.addItemTabelaReembolso()
  }

  linhaSelecionada(linha: any) {
    this.cod_prest = linha['cod-prest'];
    if (linha != undefined || linha != null || linha != '') {
      this.btnCadastrar = false;
    }
    this.dataDescricao = linha['tt-prest-contas-desp'];
    if (this.dataDescricao != undefined) {
      let soma = 0;
      this.quantidade_reembolso = this.dataDescricao.length;
      let total = this.dataDescricao.map((item: any) => {
        soma += parseFloat(item['vl-tot']);
      });
      let formatado = soma.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
      this.total_reembolso = formatado;
    }
    this.addItemTabela();
  }

  limparDataDescricao() {
    this.dataDescricao = [];
    this.btnCadastrar = true;
    this.cod_prest = 0;
    this.quantidade_reembolso = 0;
    this.total_reembolso = '0';
  }

  atualizaHora() {
    let inst_data = new Date();

    let horas = inst_data.getHours();
    let minutos = inst_data.getMinutes();
    let segundos = inst_data.getSeconds();

    let h = horas < 9 ? '0' + horas : horas;
    let m = minutos < 9 ? '0' + minutos : minutos;
    let s = segundos < 9 ? '0' + segundos : segundos;

    this.hora = `${h}:${m}:${s}`;
  }

  cadastrarReembolso() {
    let parametros: any = {
      'metodo': 1,
      'tt-prest-contas-desp': [
        {
          /* 'cod-prest': this.cadastroDetalhes.cod_prest, */
          'cod-desp': this.cadastroDetalhes.cod_desp,
          'quantidade': this.cadastroDetalhes.quantidade,
          'un': this.cadastroDetalhes.un,
          'vl-unit-pad': this.cadastroDetalhes.vl_unit,
          'vl-tot': this.cadastroDetalhes.vl_total,
          'observacoes': this.cadastroDetalhes.observacao,
          'data': this.cadastroDetalhes.data,
          'hora': this.cadastroDetalhes.hora,
        },
      ],
    };

    this.cadastroService.cadastrarDetalhes(parametros, (item: any) => {
      console.log(item);
    });
  }
}
