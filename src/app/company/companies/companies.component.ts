import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {MatPaginator, PageEvent} from '@angular/material';
import {Page} from '../../page.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Page<Company>;
  length;
  pageSize = 10;
  pageSizeOptions = [4, 10, 20, 100];
  pageEvent: PageEvent;
  search: string;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  company: Company;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
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

  searchCompany(){
    this.paginator._pageIndex = 0;
    this.getCompanies( 0, this.pageSize, this.search);
  }

  onDelete(company: Company){
    this.companies.results.splice(this.companies.results.indexOf(company),1);
  }

  deleteCompany(){
    this.companyService.deleteCompany(this.company.id).subscribe();
  }

  errorImage() {
    this.company.logo = 'https://www.freeiconspng.com/uploads/no-image-icon-15.png';
  }

}
