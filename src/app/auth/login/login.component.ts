import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
      .subscribe(
        (user) => {
          console.log(user);
          this.snackBar.open(
            'Logged in Successfully. Welcome!' + user.firstname+ '!', 'OK',{duration:4000})
            this.router.navigateByUrl('/');
        },
        (err) =>{
          console.log(err);
          this.snackBar.open(
            'Login Error', 'OK',{duration:4000})
          

        }
      )
  }

}
