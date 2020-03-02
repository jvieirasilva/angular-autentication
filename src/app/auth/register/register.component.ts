import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister = this.fb.group({
    firstname: ['',[Validators.required]],
    lastname: ['',[Validators.required]],
    address: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    mobilephone: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password1: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required, Validators.minLength(6)]],

  }, {Validator: this.matchingPasswords})
  states = ["SP", "MG","","BA","RJ","BH"];

  constructor(private fb: FormBuilder,
              private  authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 == password2){
        return null;
      }
    }
    return {matching: false };
  }
  onSubmit(){
    console.log('Usuario:' +this.formRegister.value);
    let u: User = { 
      ...this.formRegister.value, 
      password: this.formRegister.value.password1}
    this.authService.resgister(u)
    .subscribe(
      (u)=>{
        this.snackBar.open('Successfully registered. Use Your credentials to sing in!',
        'OK Cadastrado',{ duration: 3000});
       // this.router.navigateByUrl('/auth/login');

      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.error.message,'Erro Durante cadastro de Usuario',{ duration: 3000});
        
      }
    )
  }

}
