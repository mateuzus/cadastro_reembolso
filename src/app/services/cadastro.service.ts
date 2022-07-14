import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  urlApi: string = environment.base_url

  constructor(private http: HttpClient) { }

  cadastrar(parametros?: any, sucess?: any, error?: any) {
    let url = this.urlApi + 'apisetprestconta'

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Basic " + btoa("aluno:aluno#2022"))
    headers_send = headers_send.append("Content-Type", "application/json")

    let params: any = {
      "metodo": 1,
      "tt-prest-contas": [
        parametros
      ]

    }
    console.log(params)

    return this.http.post(url, params, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(sucess, error)
  }
}
