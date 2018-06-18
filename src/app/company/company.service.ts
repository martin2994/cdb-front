import { Injectable } from '@angular/core';
import {Company} from './company.model';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Computer} from './company-detail/computer.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://127.0.0.1:8080/webservice/company';

  constructor(private httpClient: HttpClient) { }

  getCompany(id: string): Observable<Company> {
    return this.httpClient.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  getComputerByCompanyId(id: string): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(`${ this._baseUrl }/${ id }/computers`);
  }
}
