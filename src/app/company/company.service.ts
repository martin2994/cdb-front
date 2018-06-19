import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './company.model';
import {Observable, of} from 'rxjs';
import {Page} from '../page.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private  _baseUrl = 'http://localhost:8080/webservice/company';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this._baseUrl);
  }

  getCompanyPage( page: number, resultPerPage: number, search: string): Observable<Page<Company>> {
    return this.http.get<Page<Company>>(this._baseUrl + '?page=' + page + '&resultPerPage=' + resultPerPage + '&search=' + search);
  }

}
