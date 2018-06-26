import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Computer } from './computer.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ComputerService} from './computer.service';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {TranslateService} from '@ngx-translate/core';
import {ErrorStateMatcher} from '@angular/material/core';

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
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class ComputersComponent implements OnInit {

  @Input() computer: Computer;
  @Output() deleteEvent: EventEmitter<Computer> = new EventEmitter();

  editForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  minDate = new Date(1970, 1, 1);

  constructor(private computerService: ComputerService, private dateAdapter: DateAdapter<Date>,
              private fb: FormBuilder, private router: Router, private  translate: TranslateService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: new FormControl(this.computer.name, [Validators.required, Validators.maxLength( 30)]),
      introduced: new FormControl(this.computer.introduced),
      discontinued: new FormControl(this.computer.discontinued)
    }, { validator: this.checkDates });
  }

  checkDates(group: FormGroup) {
    if (!isNullOrUndefined(group.get('discontinued').value) && group.get('discontinued').value !== '') {
      if (new Date(group.controls.discontinued.value) < new Date(group.controls.introduced.value)) {
        return {
          endDateLessThanStartDate: true
        };
      }
    }
    return null;
  }

  submit() {
    if (this.editForm.valid) {
      this.computer = <Computer>{...this.computer, ...this.editForm.value};

      if(!isNullOrUndefined(this.computer.introduced)) {
        this.computer.introduced = new Date(this.computer.introduced).toLocaleDateString().split('/')[2]
          + '-' + new Date(this.computer.introduced).toLocaleDateString().split('/')[1]
          + '-' + new Date(this.computer.introduced).toLocaleDateString().split('/')[0];
      }

      if(!isNullOrUndefined(this.computer.discontinued)) {
        this.computer.discontinued = new Date(this.computer.discontinued).toLocaleDateString().split('/')[2]
          + '-' + new Date(this.computer.discontinued).toLocaleDateString().split('/')[1]
          + '-' + new Date(this.computer.discontinued).toLocaleDateString().split('/')[0];
      }

      console.log(this.computer.introduced + '  ' + this.computer.discontinued);

      console.log(this.computer);

      this.computerService.update(this.computer).subscribe();
    }
  }

  remove() {
    if(confirm( this.translate.instant('POPUP.ON_DELETE') + this.computer.name + ' ?')) {
      this.computerService.remove(this.computer).subscribe(() => this.deleteEvent.emit(this.computer));
    }
  }

}
