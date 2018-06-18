import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Computer} from './computer.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  company: Company;
  computers: Computer[];

  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id')).subscribe(company => {
      this.company = company;
    });

    this.companyService.getComputerByCompanyId(this.route.snapshot.paramMap.get('id')).subscribe(computers => {
      this.computers = computers;
    });
  }

}
