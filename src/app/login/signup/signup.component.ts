import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from '../../authenfication/user.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorPassword = false;
  validUsername = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      confirm_password: new FormControl('', [Validators.required, this.matchOtherValidator('password')])
    });
  }

  signUp() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this.isExistAndCreate();
    }
  }

  isExistAndCreate() {
    if (this.signupForm) {
       this.userService.isExistUser(this.signupForm.value.username).subscribe(user =>
         this.validUsername = user.username === null,
         () => {}, () => {
         if (this.validUsername) {
           const new_user = new User();
           new_user.username = this.signupForm.value.username;
           new_user.password = this.signupForm.value.password;
           this.userService.createUser(new_user).subscribe(() => this.router.navigate(['/login']));
         }
         });
      }
    }

  matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;
    return function matchOtherValidate(control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }
      return null;
    };
  }

  goBack() {
    this.location.back();
  }
}
