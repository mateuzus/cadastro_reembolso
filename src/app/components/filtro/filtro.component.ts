import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  codIni: number = 0
  codFim: number = 9999
  dataPrestIni: string = ''
  dataPrestFim: string = ''
  solicitacaoIni: string = ''
  solicitacaoFim: string = ''
  situacaoIni: number = 0
  situacaoFim: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
