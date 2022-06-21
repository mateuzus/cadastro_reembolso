import { Component, OnInit, ViewChild } from '@angular/core';
import { PoMenuItem, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { Router } from '@angular/router';

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

  modal_type: any = ''
  title: string = ''

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
}


