import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor (
    private fb: FormBuilder, 
    private route: Router, private toastr: ToastrService
   ) 
   { }

   showPassword = false;
    showcPassword = false;
   togglePasswordVisibility1() {
     this.showPassword = !this.showPassword;
   }
   togglePasswordVisibility2() {
    this.showcPassword = !this.showcPassword;
  }

  registrationform = this.fb.group({
    name:['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    cp:['',Validators.required]
  })

  getControl(a: any) {
    return this.registrationform.get(a);

  }
  save() {
  console.log(this.registrationform.value);
    }

}
