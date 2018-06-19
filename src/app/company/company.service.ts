import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './company.model';
import {Observable, of} from 'rxjs';
import {Computer} from './company-detail/computers/computer.model';
import {Page} from '../page.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8080/webservice/company';
  // private _baseUrl = 'http://10.0.1.75:8086/webservice/company';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this._baseUrl);
  }

  getCompanyPage( page: number, resultPerPage: number, search: string): Observable<Page<Company>> {
    return this.http.get<Page<Company>>(this._baseUrl + '?page=' + page + '&resultPerPage=' + resultPerPage + '&search=' + search);
  }


  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  getComputerByCompanyId(id: string, page: number, number_of_elems: number): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${ this._baseUrl }/${ id }/computers?page=${page}&resultPerPage=${number_of_elems}`);
  }

  getCountByCompanyId(id: string): Observable<number> {
    return this.http.get<number>(`${ this._baseUrl }/${ id }/count`);
  }
}
