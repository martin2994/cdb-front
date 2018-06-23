import { Component, OnInit } from '@angular/core';
import {Company} from '../../company.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Computer} from '../computers/computer.model';
import {CompanyService} from '../../company.service';
import {DateAdapter, MAT_DATE_LOCALE, MatSnackBar} from '@angular/material';
import {ComputerService} from '../computers/computer.service';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {isEmpty} from 'rxjs/operators';


@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class ComputerCreateComponent implements OnInit {

  computer = new Computer();
  computerForm: FormGroup;
  display = false;
  company_id = this.route.snapshot.paramMap.get('id');
  error: any = {isError: false, errorMessage: ''};

  constructor(private computerService: ComputerService, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,
              private route: ActivatedRoute,
              private router: Router) {
    this.dateAdapter.setLocale('fr');
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.computerForm = this.fb.group({
      name: ['', Validators.required],
      introduced: [''],
      discontinued: ['']
    });
  }

  compareDates() {

    console.log(new Date(this.computerForm.get('discontinued').value));

    if (!isNullOrUndefined(new Date(this.computerForm.get('introduced').value)) && !isNullOrUndefined(new Date(this.computerForm.get('discontinued').value))) {
      if (new Date(this.computerForm.get('discontinued').value) < new Date(this.computerForm.get('introduced').value)) {
        this.error = {isError: true, errorMessage: 'End Date can\'t before start date'};
      } else {
        this.error = {isError: false, errorMessage: ''};
      }
    }
  }

  onSubmit() {

    this.computer.name = this.computerForm.get('name').value;

    console.log(this.computerForm.get('introduced').value == '');
    console.log(isNullOrUndefined(new Date(this.computerForm.get('discontinued').value)));

    if(this.computerForm.get('introduced').value != '') {
      this.computer.introduced = new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[2]
        + '-' + new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[1]
        + '-' + new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[0];
    } else {
      this.computer.introduced = null;
    }

    if(this.computerForm.get('discontinued').value != '') {
      this.computer.discontinued = new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[2]
        + '-' + new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[1]
        + '-' + new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[0];
    } else {
      this.computer.discontinued = null;
    }

    this.computer.manufacturerId = +this.company_id;

    //console.log(this.computer);

    this.computerService.create(this.computer).subscribe();

    this.router.navigate(['company/' + this.company_id])
  }
}
