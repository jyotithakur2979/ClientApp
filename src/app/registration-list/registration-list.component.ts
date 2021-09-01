import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  public registrationList:any;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
  private router: Router) { }

  ngOnInit() {
    this.getRegistration();

  }

  public getRegistration():void{
    this.http.get("http://localhost:56771/api/registration")
    .subscribe(
      (result) => {
        this.registrationList=result;
      },
      (error) => {
        alert('Some error is ocured'+error.message);
      }
    )
  }

  public Update_click(id:number){
    this.router.navigateByUrl('/Registration', { state: {'id':id}});
  }

  public Delete_click(id:number){
    this.http.delete("http://localhost:56771/api/registration/" + id)
    .subscribe(
      (result)=>{
        this.ngOnInit();
      },
      (err)=>{
        alert('Some error is ocured'+err.massage);
      }
    )   
  }



}
