import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public loaderStatus: boolean = false;

  public registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mobileno: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  public saveData(): void {

    if (this.registrationForm.valid) {
      this.loaderStatus = true;
      let data = this.registrationForm.value;
      let formData = {
        "name": data.name,
        "emailid": data.emailid,
        "password": data.password,
        "mobileno": data.mobileno
      };
      this.http.post(this.baseUrl + "api/registration", formData)
        .subscribe(result => {
          if (result == 1) {            
            this.registrationForm.reset();
            this._snackBar.open("Registration done successfully.", "", { duration: 10 * 1000 });
          }
          if (result == 0) {
            this._snackBar.open("Email id already regitered.", "", { duration: 10 * 1000 });
          }
          this.loaderStatus = false;
        });
    } else {
      this._snackBar.open("Forms value are empty. please fill form", "", { duration: 10 * 1000 });
    }
  }

}
