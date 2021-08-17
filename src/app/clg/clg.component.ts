import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clg',
  templateUrl: './clg.component.html',
  styleUrls: ['./clg.component.css']
})
export class ClgComponent implements OnInit {
  public Clg: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
    private router: Router) {
      
     }

  ngOnInit() {
  
    this.getAllClg();

  }

  public getAllClg(): void {
    this.http.get("http://localhost:56771/api/Clg")
      .subscribe(
        (result) => {
          this.Clg = result;
        },
        (err) => {
          alert('Some error is ocured' + err.message);
        }
      )
  }

  public Delete_click(id:number){
    this.http.delete("http://localhost:56771/api/Clg/" + id)
    .subscribe(
      (result)=> {
        this.ngOnInit();
      },
      (err) => {
        alert('Some error is ocured'+err.massage);
      }
    )
  }

  public Update_click(id:number){
    this.router.navigateByUrl('/Clg-list', { state: {'id':id}});
  }

}
