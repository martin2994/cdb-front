import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {MatPaginator, PageEvent} from '@angular/material';
import {Page} from '../../page.model';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [
    trigger('companyAnim', [
      transition(':enter', [
        style({
          opacity: '0',
          height: '0'
        }),
        animate('.5s ease-out', style({
          opacity: '1',
          height: '*'
        })),
      ]),
      transition(':leave', [
        style({
          height: '*',
          opacity: '1'
        }),
        animate('.5s ease-out', style({
          height: '0',
          opacity: '0'
        }))
      ])
    ])
  ]
})
export class CompaniesComponent implements OnInit {


  companies: Page<Company>;
  //translate: TranslateService;
  length;
  pageSize = 10;
  pageSizeOptions = [4, 10, 20, 100];
  pageEvent: PageEvent;
  search: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  checked = false;
  breakpoint: number;

  constructor(private companyService: CompanyService, private  translate: TranslateService) {
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : (window.innerWidth <= 800) ? 2 : 4;
    this.search = '';
    this.getCompanies(0, this.pageSize, this.search);
  }

  getCompanies(page: number, resultPerPage: number, search: string) {
    this.companyService.getCompanyPage(page, resultPerPage, search).subscribe(company => {
      this.companies = company;
      this.pageSize = company.resultPerPage;
      this.length = company.numberOfElements;
    });
  }

  changePagination(event) {
    this.pageEvent = event;
    this.getCompanies(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.search);
  }

  searchCompany() {
    this.paginator._pageIndex = 0;
    this.getCompanies( 0, this.pageSize, this.search);
  }

  deleteCompany(company: Company) {
    console.log(company);
    if(confirm( this.translate.instant('POPUP.ON_DELETE') + company.name + '?')) {
      this.companyService.deleteCompany(company.id).subscribe();
      this.companies.results.splice(this.companies.results.indexOf(company), 1 );
    }
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : (window.innerWidth <= 800) ? 2 : 4;
  }
}
