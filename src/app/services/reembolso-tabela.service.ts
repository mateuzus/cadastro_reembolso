import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReembolsoTabelaService {

  urlApi: string = environment.base_url

  constructor(private http: HttpClient) { }

  colunasTabelaReembolso(component_instance: any): Array<PoTableColumn> {
    return [
      {
        property: "actions",
        label: "Ações",
        type: "icon",
        width: '80px',
        icons: [
          {
            action: (value: any, row: any) => {
              component_instance.deletarReembolso(
                value,
                row
              )
            },
            color: "primary",
            icon: "po-icon po-icon-delete",
            tooltip: "Clique aqui para deletar",
            value: "deletar"
          },
          {
            action: (value: any, row: any) => {
              component_instance.abrirModalEditarReembolso(
                value,
                row
              )
            },
            color: "primary",
            icon: "po-icon po-icon-edit",
            tooltip: "Clique aqui para editar",
            value: "editar"
          }
        ]
      },
      { property: 'cod-prest', label: 'Cód. Prestação' },
      { property: 'ind-sit', label: 'Ind. da Situação' },
      { property: 'sc-codigo', label: 'Cód. Centro de Custo' },
      { property: 'solicitante', label: 'Solicitante' }
    ]
  }

  colunasTabelaDescricao(component_instance: any) {
    return [
      {
        property: "actions",
        label: "Ações",
        type: "icon",
        width: '80px',
        icons: [
          {
            action: (value: any, row: any) => {
              component_instance.deletarDetalhes(
                value,
                row
              )
            },
            color: "primary",
            icon: "po-icon po-icon-delete",
            tooltip: "Clique aqui para deletar",
            value: "deletar"
          },
          {
            action: (value: any, row: any) => {
              component_instance.abrirModalEditarDetalhes(
                value,
                row
              )
            },
            color: "primary",
            icon: "po-icon po-icon-edit",
            tooltip: "Clique aqui para editar",
            value: "editar"
          }
        ]
      },
      { property: 'cod-prest', label: 'Cód. Prestação' },
      { property: 'cod-desp', label: 'Cód. Despesa' },
      { property: 'observacoes', label: 'Observação' },
      { property: 'un', label: 'UN' },
      { property: 'quantidade', label: 'Quantidade' },
      { property: 'vl-unit-pad', label: 'Val. Unitário', format: 'BRL' },
      { property: 'vl-tot', label: 'Val. Total', format: 'BRL' },
      { property: 'hora', label: 'Hora', format: 'time' },
      { property: 'data', label: 'Data', format: 'dd/mm/yyyy' }
    ]
  }

  colunasTabelaCc(): Array<PoTableColumn> {
    return [
      { property: 'sc-codigo', label: 'Código' },
      { property: 'descricao', label: 'Descrição' }
    ]
  }

  despesas(sucess?: any, error?: any) {
    let url = this.urlApi + 'apigetdesppad'

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Basic " + btoa("aluno:aluno#2022"))
    headers_send = headers_send.append("Content-Type", "application/json")

    return this.http.get(url, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(sucess, error)
  }

  centroCustos(parametros?: any, sucess?: any, error?: any) {
    let url = this.urlApi + 'apigetcc'

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Basic " + btoa("aluno:aluno#2022"))
    headers_send = headers_send.append("Content-Type", "application/json")

    let params: any = {
      "tt-p-cc": parametros
    }

    return this.http.post(url, params, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(sucess, error)
  }

  prestContas(parametros?: any, sucess?: any, error?: any) {
    let url = this.urlApi + 'apigetprestconta'

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Basic " + btoa("aluno:aluno#2022"))
    headers_send = headers_send.append("Content-Type", "application/json")

    let params: any = {
      "tt-p-pc": parametros
    }

    return this.http.post(url, params, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(sucess, error)
  }
}
