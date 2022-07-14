import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string = ''
  password: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

   sendLogin() {
    if (this.login === 'Mateus' && this.password === '123') {
      sessionStorage.setItem('login', this.login)
      sessionStorage.setItem('password', this.password)
      this.router.navigate(['/menu'])
    }
  }
}
