import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class ReembolsoTabelaService {

  constructor() { }

  colunasTabelaReembolso(component_instance: any): Array<PoTableColumn> {
    return [
      {
        property: "actions",
        label: "Ações",
        type: "icon",
        icons: [
          {
            action: (value: any, row: any) => {
              component_instance.deletar(
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
              component_instance.editar(
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
      { property: 'id', label: 'Id' },
      { property: 'cod-despesa', label: 'Cód. Despesa' },
      { property: 'quantidade', label: 'Quantidade' },
      { property: 'um', label: 'UM' },
      { property: 'valor-unitario', label: 'Valor Unitário' },
      { property: 'valor-total', label: 'Valor Total' },
      { property: 'centro-custo', label: 'Centro de Custo' },
      { property: 'user', label: 'Usuário' },
      { property: 'observacoes', label: 'Observações' },
    ]
  }
}
