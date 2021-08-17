import { Component,  Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  public isUpdate:Boolean=false;
  public updateId:number;
  public countryList: any;

  public countryForm = new FormGroup({
    countryname: new FormControl('', Validators.required)

  })


 
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
  private sb: MatSnackBar, private router: Router) { 
   
  }


  ngOnInit() {
   this.loadUpdateData();
    this.getCountry();  
    
    
   
  }

  public loadUpdateData():void{
    if (this.isUpdate == true) {
      this.http.get("http://localhost:56771/api/CountyName/" + this.updateId)
        .subscribe(
          (result) => {
            this.countryForm.controls['countryname'].setValue(result['countryname1']);
                      
          },
          (err) => {
            alert('Some error is ocured' + err.massage);
          }
        )
    }
  }

 

  public Save():void{
    if (this.countryForm.valid) {
      let data = this.countryForm.value;
      let formData = {
        "countryname": data.countryname,
      };

      this.http.post("http://localhost:56771/api/CountyName", formData)
        .subscribe(
          (response) => {
            this.sb.open("Country data is saved succeesfully.", "", { duration: 5 * 1000 });
            this.countryForm.reset();
            this.getCountry();
          },
          (error) => {
            this.sb.open(error.message, "", { duration: 5 * 1000 });
          }
        );
    } else {
      this.countryForm.markAllAsTouched();
    }
    
  }

  public Update(){
    if (this.countryForm.valid) {
      let data = this.countryForm.value;
      let formData = {
        "countryname": data.countryname,
      };

      this.http.put("http://localhost:56771/api/CountyName/" +this.updateId, formData)
        .subscribe(
          (response) => {
            this.sb.open("Country data is updated succeesfully.", "", { duration: 5 * 1000 });
            this.countryForm.reset();
            this.getCountry();
            this.isUpdate=false;
          
          },
          (error) => {
            this.sb.open(error.message, "", { duration: 5 * 1000 });
          }
        );
    } else {
      this.countryForm.markAllAsTouched();
    }

  }

  public Update_click(id: number){
   this.updateId=id;
   this.isUpdate=true;
   this.loadUpdateData();

  }

  public getCountry():void {
    this.http.get("http://localhost:56771/api/CountyName")
    .subscribe(
      (result)=>{
        this.countryList=result;
      },
      (err)=>{
        alert('Some error is ocured'+err.message);
      }
    )
  }
  

}
