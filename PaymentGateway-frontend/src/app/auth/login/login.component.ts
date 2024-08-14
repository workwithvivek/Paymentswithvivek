import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gapi } from 'gapi-script';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // gapi: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService:AuthServiceService   
  ) { }

  loginform = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getControl(a: any) {
    return this.loginform.get(a);
  }

  saveForm() {
    console.log(this.loginform.value);
    // Add form login logic here
  }

  // ngOnInit() {
  //   this.googleInit();
  // }
  

  // googleInit() {
  //   gapi.load('auth2', () => {
  //     gapi.auth2.init({
  //       client_id: '447038926527-dtt81afop239tds5vetdol8femost6e7.apps.googleusercontent.com',  // Replace with your client ID
  //       cookie_policy: 'single_host_origin',
  //       scope: 'profile email'
  //     }).then(() => {
  //       this.attachSignin(document.getElementById('googleBtn'));
  //     });
  //   });
  // }

  // attachSignin(element: any) {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   auth2.attachClickHandler(element, {},
  //     (googleUser: any) => {
  //       const profile = googleUser.getBasicProfile();
  //       const token = googleUser.getAuthResponse().id_token;

  //       // Send the token to the backend for verification
  //       this.authService.googleLogin(token).subscribe(response => {
  //         this.toastr.success('Login successful');
  //         // this.route.navigate(['/dashboard']);  // Redirect on success
  //       }, error => {
  //         this.toastr.error('Google login failed');
  //       });
  //     }, (error: any) => {
  //       console.log(JSON.stringify(error, undefined, 2));
  //     });
  // }
  }
