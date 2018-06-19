import { Injectable } from '@angular/core';
import {Company} from './company.model';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Computer} from './company-detail/computers/computer.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8080/webservice/company';
  // private _baseUrl = 'http://10.0.1.75:8086/webservice/company';

  constructor(private httpClient: HttpClient) { }

  getCompany(id: string): Observable<Company> {
    return this.httpClient.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  getComputerByCompanyId(id: string, page: number, number_of_elems: number): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(`${ this._baseUrl }/${ id }/computers?page=${page}&resultPerPage=${number_of_elems}`);
  }

  getCountByCompanyId(id: string): Observable<number> {
    return this.httpClient.get<number>(`${ this._baseUrl }/${ id }/count`);
  }
}
