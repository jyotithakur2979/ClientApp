import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-clg-list',
  templateUrl: './clg-list.component.html',
  styleUrls: ['./clg-list.component.css']
})
export class ClgListComponent implements OnInit {
  public isUpdate: boolean = false;
  public updateId: number;
  public status: boolean = false;


  public ClgForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobileno: new FormControl('', Validators.required)

  })



  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
    private _snackBar: MatSnackBar, private router: Router) {
    let data = router.getCurrentNavigation().extras.state;
    if (data) {
      this.isUpdate = true;
      this.updateId = data.id;
      
    }
  }

  ngOnInit() {
    if (this.isUpdate == true) {
      this.http.get("http://localhost:56771/api/Clg/" + this.updateId)
        .subscribe(
          (result) => {
            this.ClgForm.controls['name'].setValue(result['name']);
            this.ClgForm.controls['mobileno'].setValue(result['mobileno']);
          },
          (err) => {
            alert('Some error is ocured' + err.massage);
          }
        )
    }



  }

  public Save(): void {
    if (this.ClgForm.valid) {
      let data = this.ClgForm.value;
      let formData = {
        "name": data.name,
        "mobileno": data.mobileno
      };
      this.http.post("http://localhost:56771/api/Clg", formData)
        .subscribe(
          (response) => {
            this._snackBar.open("Clg-list data is Saved succeesfully.", "", { duration: 5 * 1000 });
            this.ClgForm.reset();
          },
          (error) => {
            this._snackBar.open(error.message, "", { duration: 5 * 1000 });
          }
        );
          
        
    } else {
      this.ClgForm.markAllAsTouched();
    }
  }

  public Update_click() {
    if (this.ClgForm.valid) {
      let data = this.ClgForm.value;
      let formData = {
        "name": data.name,
        "mobileno": data.mobileno,
      };

      this.http.put("http://localhost:56771/api/Clg/" + this.updateId, formData)
        .subscribe(
          (response) => {
            this._snackBar.open("Clg-list data  isupdated succeesfully.", "", { duration: 5 * 1000 });
            this.ClgForm.reset();
          },
          (error) => {
            this._snackBar.open(error.message, "", { duration: 5 * 1000 });
          }
        );


    } else {
      this.ClgForm.markAllAsTouched();
    }
  }
}
