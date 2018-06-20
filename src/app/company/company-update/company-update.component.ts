import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {Company} from '../company.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit {

  company: Company;
  companyForm: FormGroup;
  display = false;

  constructor(private companyService: CompanyService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id'))
      .subscribe(company => { this.company  = company; this.createForm(); });
  }

  update() {
    this.company.name = this.companyForm.get('name').value;
    this.company.logo = this.companyForm.get('logo').value;
    this.companyService.updateCompany(this.company).subscribe(
      () => this.router.navigate(['company/' + this.company.id]),
      () => this.addFail());
  }

  createForm() {
    this.companyForm = this.fb.group({
      name: [this.company.name || '', Validators.required],
      logo: [this.company.logo || '']
    });
    this.displayLogo();
  }
  addFail() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 2000;
    config.panelClass = ['fail'];
    this.snackBar.open('Erreur d ajout', 'OK', config);
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
}
