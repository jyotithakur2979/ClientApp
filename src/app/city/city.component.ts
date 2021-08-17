import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  public isUpdate:Boolean=false;
  public updateId:number;
  public cityList:any;



  public cityForm = new FormGroup({
    city: new FormControl('', Validators.required)

  })
  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
  private sb: MatSnackBar, private router: Router) {}
  

  ngOnInit() {
    this.loadUpdateData();
    this.getCity();
  }

  public loadUpdateData():void{
    if (this.isUpdate == true) {
      this.http.get("http://localhost:56771/api/City/" + this.updateId)
        .subscribe(
          (result) => {
            this.cityForm.controls['city'].setValue(result['city1']);
                      
          },
          (err) => {
            alert('Some error is ocured' + err.massage);
          }
        )
    }
  }

  public Save():void{
    if (this.cityForm.valid) {
      let data = this.cityForm.value;
      let formData = {
        "city": data.city,
      };
      this.http.post("http://localhost:56771/api/City", formData)
      .subscribe(
        (response) => {
          this.sb.open("City data is saved succeesfully.", "", { duration: 5 * 1000 });
          this.cityForm.reset();
          this.getCity();
        },
        (error)=> {
          this.sb.open(error.message, "", { duration: 5 * 1000 });
        } 
      );
    }else{
      this.cityForm.markAllAsTouched(); 
    }

  }


  public Update(){
    if (this.cityForm.valid) {
      let data = this.cityForm.value;
      let formData = {
        "city": data.city,
      };
      this.http.put("http://localhost:56771/api/City/" +this.updateId,formData)
      .subscribe(
        (response) => {
          this.sb.open("City data is updated succeesfully.", "", { duration: 5 * 1000 });
            this.cityForm.reset();
            this.getCity();
            this.isUpdate=false;
        },
        (error) => {
          this.sb.open(error.message, "", { duration: 5 * 1000 });
        }
      );
    }else{
      this.cityForm.markAllAsTouched();
    }

  }


public Update_click(id: number){
   this.updateId=id;
   this.isUpdate=true;
   this.loadUpdateData();

  }

  public getCity():void{
    this.http.get("http://localhost:56771/api/City")
    .subscribe(
      (result) => {
        this.cityList=result;
      },
      (error) => {
        alert('Some error is ocured'+error.message);
      }
    )

  }




}
