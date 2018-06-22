import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Computer } from './computer.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ComputerService} from './computer.service';
import {MAT_DATE_LOCALE} from '@angular/material';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private computerService: ComputerService, private router: Router, private  translate: TranslateService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.computer.name),
      introduced: new FormControl(this.computer.introduced),
      discontinued: new FormControl(this.computer.discontinued)
    });
  }

  submit() {
    if (this.editForm.valid) {
      this.computer = {...this.computer, ...this.editForm.value};

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
