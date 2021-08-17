import { HttpClient } from '@angular/common/http';
import { Component,  Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public list: Array<any>=[];
  public emplList: any;
  public data: any;
  public username:string;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
   private router: Router) {   

   }
   
  ngOnInit() {

    this.getEmployee();
    this.username="anand verma";
    this.list.push({"name":"sdasds","email":"sdad@gail.com"});
    this.list.push({"name":"sdasds","email":"sdad@gail.com"});
    
    
  }

  public getEmployee(): void {
    this.http.get("http://localhost:56771/api/EmployeData")
    .subscribe(
      (result)=>{
        this.emplList=result;
      },
      (err)=>{
        alert('Some error is ocured'+err.message);
      }
    )
  }
  

  public Delete_click(id:number){
    this.http.delete("http://localhost:56771/api/EmployeData/" + id)
    .subscribe(
      (result)=>{
        this.ngOnInit();
      },
      (err)=>{
        alert('Some error is ocured'+err.massage);
      }
    )   
  }
  public Update_click(id:number){
    this.router.navigateByUrl('/employee', { state: {'id':id}});
  }
  
}
