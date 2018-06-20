import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from './company.model';
import {CompanyService} from './company.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: Company;
  @Output() deleteEvent: EventEmitter<Company> = new EventEmitter();

  constructor(private companyService: CompanyService, private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

  deleteCompany(){
    this.companyService.deleteCompany(this.company.id).subscribe();
    this.deleteEvent.emit(this.company);
  }

}
