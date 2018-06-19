import { Component, Input, OnInit } from '@angular/core';
import { Computer } from './computer.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComputerService} from './computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {

  @Input() computer: Computer;
  editForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  constructor(private computerService: ComputerService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      introduced: [this.computer.introduced],
      discontinued: [this.computer.discontinued]
    });
  }

  ngOnInit() {

  }

  submit() {
    if (this.editForm.valid) {
      this.computer = { ...this.computer, ...this.editForm.value };
      this.computerService.updateComputer(this.computer).subscribe();
    }
  }

}
