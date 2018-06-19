///<reference path="../../../../node_modules/@angular/material/snack-bar/typings/snack-bar.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {


  company = new Company();
  companyForm: FormGroup;

  constructor(private companyService: CompanyService, private fb: FormBuilder, public snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.company.name = this.companyForm.get('name').value

    this.companyService.createCompany(this.company).subscribe(() => this.addSucceed(), () => this.addFail());

  }
  createForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      picture: ['']
    });
  }
  addSucceed() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 2000;
    config.panelClass = ['succeed'];
    this.snackBar.open('Ajout réussi', 'OK', config);
  }
  addFail() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 2000;
    config.panelClass = ['fail'];
    this.snackBar.open('Erreur d ajout', 'OK', config);
  }
}
