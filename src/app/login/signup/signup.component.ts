import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from '../../authenfication/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorPassword = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  signUp() {
    if (this.signupForm.invalid && this.signupForm.value.password !== this.signupForm.value.confirm_password) {
      return;
    }
    const user = new User();
    user.username = this.signupForm.value.username;
    user.password = this.signupForm.value.password;
    this.userService.createUser(user).subscribe(() => this.router.navigate(['/login']));
  }

  matchValidator() {
    if ( this.signupForm.value.password !== this.signupForm.value.confirm_password) {
      this.errorPassword = true;
    } else {
      this.errorPassword = false;
    }
  }
}
