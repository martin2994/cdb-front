import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Computer} from './computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private _baseUrl = 'http://localhost:8080/webservice/computer';

  constructor(private httpClient: HttpClient) { }

  update(computer: Computer) {
    return this.httpClient.put(`${ this._baseUrl }/${ computer.id }`, computer);
  }

  remove(computer: Computer) {
    return this.httpClient.delete(`${ this._baseUrl }/${ computer.id }`);
  }
}
