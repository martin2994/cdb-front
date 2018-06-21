import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Computer} from './computers/computer.model';
import {DateAdapter, PageEvent} from '@angular/material';
import {ComputerService} from './computers/computer.service';
import {isNullOrUndefined} from 'util';
import {Page} from '../../page.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss',
    "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
  ]
})
export class CompanyDetailComponent implements OnInit {

  company: Company;
  computers: Page<Computer>;

  search_mod = false;
  search: string;

  pageEvent: PageEvent;

  length: number;
  pageSize = 10;
  pageSizeOptions = [5, 10];
  pageSizeChanged = false;

  constructor(private companyService: CompanyService, private computerService: ComputerService, private route: ActivatedRoute, private adapter: DateAdapter<any>) {
    this.adapter.setLocale('fr');
  }

  pageUpdate(event: PageEvent) {

    this.pageSizeChanged = false;

    if (this.pageSize !== event.pageSize) {
      this.pageSizeChanged = true;
      this.pageSize = event.pageSize;
      event.pageIndex = 1;
    }

    this.pageEvent = event;

    console.log(event.pageIndex + ' - ' + event.pageSize + ' - ' + this.pageSize);

    if (this.search_mod) {
      this.companyService.findComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
        (this.pageSizeChanged === false) ? event.pageIndex : 0, event.pageSize, this.search).subscribe(computers => {
        this.computers = computers;
        this.pageSize = computers.resultPerPage;
        this.length = computers.numberOfElements;
      });
    } else {
      this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
        (this.pageSizeChanged === false) ? event.pageIndex : 0, event.pageSize).subscribe(computers => {
        this.computers = computers;
        this.pageSize = computers.resultPerPage;
        this.length = computers.numberOfElements;
      });
    }

  }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id')).subscribe(company => {
      this.company = company;
    });

    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
      0, this.pageSize).subscribe(computers => {
        this.computers = computers;
        this.pageSize = computers.resultPerPage;
        this.length = computers.numberOfElements;
    });
  }

  searchComputers() {
    if(!isNullOrUndefined(this.search) && this.search.length > 0){
      this.search_mod = true;
      console.log(this.search);
      this.companyService.findComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
         0, this.pageSize, this.search).subscribe(computers => {
        this.computers = computers;
        this.pageSize = computers.resultPerPage;
        this.length = computers.numberOfElements;
      });
    }
  }

  reinitializeList() {
    this.search_mod = false;
    this.search = "";
    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
       0, this.pageSize).subscribe(computers => {
      this.computers = computers;
      this.pageSize = computers.resultPerPage;
      this.length = computers.numberOfElements;
    });
  }

  delete(computer) {
    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
      0, this.pageSize).subscribe(computers => {
      this.computers = computers;
      this.pageSize = computers.resultPerPage;
      this.length = computers.numberOfElements;
    });
  }

}
