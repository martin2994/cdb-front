///<reference path="../../../../node_modules/@angular/material/snack-bar/typings/snack-bar.d.ts"/>
///<reference path="../../../../node_modules/@angular/animations/src/animation_metadata.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Location} from '@angular/common';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query(':enter', stagger('200ms', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query(':enter', [
          animate(1000, style('*'))
        ])
      ])
    ])

  ]
})
export class CompanyCreateComponent implements OnInit {


  company = new Company();
  companyForm: FormGroup;
  display = false;

  constructor(private companyService: CompanyService, private fb: FormBuilder, public snackBar: MatSnackBar, private location: Location) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.company.name = this.companyForm.get('name').value;
    this.company.logo = this.companyForm.get('logo').value;
    this.companyService.createCompany(this.company).subscribe(() => this.addSucceed(), () => this.addFail());
  }
  createForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['']
    });
    this.displayLogo();
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
