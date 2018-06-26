import {Component, OnInit, Input, Output, ViewChild, Inject} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, PageEvent} from '@angular/material';
import {Page} from '../../page.model';
import {animate, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

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
  length;
  pageSize = 12;
  pageSizeOptions = [4, 12, 32, 128];
  pageEvent: PageEvent;
  search: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  checked = false;

  constructor(private companyService: CompanyService, private  translate: TranslateService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.search = '';
    this.pageSize = 12;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.deleteCompany(company.id).subscribe();
        this.companies.results.splice(this.companies.results.indexOf(company), 1 );
      }
    });
  }
}

