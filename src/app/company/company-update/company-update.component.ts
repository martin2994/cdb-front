import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {Company} from '../company.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('1s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class CompanyUpdateComponent implements OnInit {

  company: Company;
  companyForm: FormGroup;
  display = false;

  constructor(private companyService: CompanyService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location, private  translate: TranslateService) {}

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id'))
      .subscribe(company => { this.company  = company; this.createForm(); });
  }

  update() {
    if(this.companyForm.valid) {
      this.company.name = this.companyForm.get('name').value;
      this.company.logo = this.companyForm.get('logo').value;
      this.companyService.updateCompany(this.company).subscribe(
        () => this.router.navigate(['company/' + this.company.id]),
        () => this.addFail());
    }
  }

  createForm() {
    this.companyForm = this.fb.group({
      name: [this.company.name || '', [Validators.required, Validators.maxLength( 30)]],
      logo: [this.company.logo || '', Validators.maxLength(255)]
    });
    this.displayLogo();
  }

  addFail() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 2000;
    config.panelClass = ['fail'];
    this.snackBar.open( this.translate.instant('SNACKBAR.ERROR_UPDATE'), 'OK', config);
  }
  displayLogo() {
    if (this.companyForm.value.logo) {
      this.display = true;
    } else {
      this.display = false;
    }
  }
  hideLogo() {
    this.display = false;
  }

  goBack() {
    this.location.back();
  }
}
