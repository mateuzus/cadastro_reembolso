import { Component, Input, OnInit } from '@angular/core';
import { ReembolsoTabelaService } from '../../services/reembolso-tabela.service';

@Component({
  selector: 'app-cadastro-detalhes',
  templateUrl: './cadastro-detalhes.component.html',
  styleUrls: ['./cadastro-detalhes.component.css']
})
export class CadastroDetalhesComponent implements OnInit {

  tp_despesa: Array<any> = []
  todasDespesas: Array<any> = []

  @Input() cod_prest: number = 0
  cod_desp: number = 0
  quantidade: number = 0
  vl_unit: number = 0
  vl_total: number = 0

  observacao: string = ''
  un: string = ''
  @Input() hora: string = ''
  data: string = ''

  despesaKm: boolean = false
  carregando: boolean = true


  constructor(private reembolsoService: ReembolsoTabelaService) { }

  ngOnInit(): void {
    this.carregarDespesas()
  }

  calculoDespesa() {
    let soma = this.vl_unit * this.quantidade
    this.vl_total = soma
    console.log(this.vl_total)
  }

  carregarDespesas() {
    this.carregando = false
    this.reembolsoService.despesas((item: any) => {
      this.carregando = true
      this.todasDespesas = item.items[0].ds_desp['tt-desp-pad']
      let arrayDespesas = item.items[0].ds_desp['tt-desp-pad']
      this.tp_despesa = arrayDespesas.map((item: any) => {
        let obj = {
          label: item['desc-desp'],
          value: item['desc-desp']
        }
        return obj
      })
    })
  }

  trocaDespesas(event: any) {
    this.limparCadastro()
    if (event == 'Quilometragem') {
      this.despesaKm = true
    } else {
      this.despesaKm = false
    }
    let filtro = this.todasDespesas.filter((item: any) => {
      if(item['desc-desp'] === event)
      return item
    })
    console.log(filtro)
    this.vl_unit = filtro[0]['vl-unit-pad']
    this.cod_desp = filtro[0]['cod-desp']
  }

  limparCadastro() {
    this.quantidade = 0
    this.vl_unit = 0
    this.vl_total = 0
    this.observacao = ''
  }

}
