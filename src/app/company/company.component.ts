import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from './company.model';
import {CompanyService} from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: Company;
  @Output() deleteEvent: EventEmitter<Company> = new EventEmitter();

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

  deleteCompany(){
    this.companyService.deleteCompany(this.company.id).subscribe();
    this.deleteEvent.emit(this.company);
  }

}
