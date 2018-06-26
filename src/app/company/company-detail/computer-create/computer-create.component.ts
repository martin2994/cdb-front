import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Computer} from '../computers/computer.model';
import {DateAdapter} from '@angular/material';
import {ComputerService} from '../computers/computer.service';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return ((control.value !== '') && isSubmitted) || ((control.value !== '') && (controlTouched && (controlInvalid || parentInvalid)));
  }
}

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss'],
})

export class ComputerCreateComponent implements OnInit {

  @Input() computer = new Computer();
  @Output() addEvent: EventEmitter<Computer> = new EventEmitter();

  computerForm: FormGroup;
  display = false;
  company_id = this.route.snapshot.paramMap.get('id');

  matcher = new MyErrorStateMatcher();
  minDate = new Date(1970, 1, 1);

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
      name: new FormControl('', [Validators.required, Validators.maxLength( 30)]),
      introduced: new FormControl(''),
      discontinued: new FormControl('')
    }, { validator: this.checkDates });
  }

  checkDates(group: FormGroup) {
    if (group.get('discontinued').value !== '') {
      if (group.controls.discontinued.value < group.controls.introduced.value) {
        return {endDateLessThanStartDate: true};
      }
    }
    return null;
  }

  onSubmit() {
    if (this.computerForm.valid) {
      this.computer.name = this.computerForm.get('name').value;

      console.log(this.computerForm.get('introduced').value === '');
      console.log(isNullOrUndefined(new Date(this.computerForm.get('discontinued').value)));

      if (this.computerForm.get('introduced').value !== '') {
        this.computer.introduced = new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[2]
          + '-' + new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[1]
          + '-' + new Date(this.computerForm.get('introduced').value).toLocaleDateString().split('/')[0];
      } else {
        this.computer.introduced = null;
      }

      if (this.computerForm.get('discontinued').value !== '') {
        this.computer.discontinued = new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[2]
          + '-' + new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[1]
          + '-' + new Date(this.computerForm.get('discontinued').value).toLocaleDateString().split('/')[0];
      } else {
        this.computer.discontinued = null;
      }

      this.computer.manufacturerId = +this.company_id;

      console.log(this.computer);

      this.computerService.create(this.computer).subscribe(() => {
        this.addEvent.emit(this.computer)
        this.router.navigate(['company/' + this.company_id]);
      });
    }
  }

  goBack() {
    this.router.navigate(['company/' + this.company_id]);
  }
}
