import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Computer} from './computers/computer.model';
import {DateAdapter, PageEvent} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  company: Company;
  @Input() computers: Computer[];

  pageEvent: PageEvent;

  length: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  pageSizeChanged = false;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private adapter: DateAdapter<any>) {
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

    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
      (this.pageSizeChanged === false) ? event.pageIndex : 0, event.pageSize).subscribe(computers => {
      computers.map(computer => {
        this.computers = computers;
      });
    });

  }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id')).subscribe(company => {
      this.company = company;
    });

    this.companyService.getCountByCompanyId(this.route.snapshot.paramMap.get('id')).subscribe( count => {
      this.length = count;
      console.log(count);

    });

    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id'),
      0, this.pageSize).subscribe(computers => {
        this.computers = computers;
    });

  }

}
