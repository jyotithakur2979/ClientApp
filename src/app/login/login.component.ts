import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loaderStatus: boolean = false;

  public LoginForm = new FormGroup({
    emailid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

  }

  public login_click() {
    if (this.LoginForm.valid) {
      this.loaderStatus = true;
      let data = this.LoginForm.value;
      let formData = {
        "emailid": data.emailid,
        "password": data.password
      };
      this.http.post(this.baseUrl + "api/Login", formData)
        .subscribe(result => {
          if (result == null) {
            this._snackBar.open("Email or password is incorrect. Please try again.", "", { duration: 10 * 1000 });
          } else {
            this.router.navigateByUrl('/customers');
          }
          this.loaderStatus = false;
        });
    } else {
      this._snackBar.open("Forms value are empty. please fill form", "", { duration: 10 * 1000 });
    }
  }
}
