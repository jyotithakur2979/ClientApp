import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public isUpdate:boolean=false;
  public updateId:number;
  public status: boolean = false;

  public emoloyeeForm = new FormGroup({
    employeenane: new FormControl('', Validators.required),
    companyname: new FormControl('', Validators.required),
    mobileno: new FormControl('', Validators.required),
    emailid: new FormControl('', Validators.required)

  })

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
    private sb: MatSnackBar, private router: Router) {
    let data = router.getCurrentNavigation().extras.state;
    if (data) {
      this.isUpdate = true;
      this.updateId = data.id;
      
    }
  }

  ngOnInit() {
    if (this.isUpdate == true) {
      this.http.get("http://localhost:56771/api/EmployeData/" + this.updateId)
        .subscribe(
          (result) => {
            this.emoloyeeForm.controls['employeenane'].setValue(result['employename']);
            this.emoloyeeForm.controls['companyname'].setValue(result['companyname']);
            this.emoloyeeForm.controls['emailid'].setValue(result['emailid']);
            this.emoloyeeForm.controls['mobileno'].setValue(result['mobileno']);            
          },
          (err) => {
            alert('Some error is ocured' + err.massage);
          }
        )
    }

  }

  public Save(): void {
    if (this.emoloyeeForm.valid) {
      let data = this.emoloyeeForm.value;
      let formData = {
        "employename": data.employeenane,
        "companyname": data.companyname,
        "mobileno": data.mobileno,
        "emailid": data.emailid
      };

      this.http.post("http://localhost:56771/api/EmployeData", formData)
        .subscribe(
          (response) => {
            this.sb.open("Employee data is saved succeesfully.", "", { duration: 5 * 1000 });
            this.emoloyeeForm.reset();
          },
          (error) => {
            this.sb.open(error.message, "", { duration: 5 * 1000 });
          }
        );
    } else {
      this.emoloyeeForm.markAllAsTouched();
    }

  }

     public Update(){
    if (this.emoloyeeForm.valid) {
      let data = this.emoloyeeForm.value;
      let formData = {
        "employename": data.employeenane,
        "companyname": data.companyname,
        "mobileno": data.mobileno,
        "emailid": data.emailid
      };

      this.http.put("http://localhost:56771/api/EmployeData/"+this.updateId, formData)
        .subscribe(
          (response) => {
            this.sb.open("Employee data is updated succeesfully.", "", { duration: 5 * 1000 });
            this.emoloyeeForm.reset();
          },
          (error) => {
            this.sb.open(error.message, "", { duration: 5 * 1000 });
          }
        );
    } else {
      this.emoloyeeForm.markAllAsTouched();
    }
  }
}
