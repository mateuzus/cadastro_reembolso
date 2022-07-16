import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input() quantidade_reembolso: number = 0
  @Input() total_reembolso: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
