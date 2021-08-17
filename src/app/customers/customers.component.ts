import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  public data: any;
  public status;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.http.get(this.baseUrl + "api/reportcard")
      .subscribe(res => {
        this.data = res;
      });
  }



  public Update_click(id: number) {
    this.http.get(this.baseUrl + "api/reportcard/" + id)
      .subscribe(res => {
        let data = res;
        this.router.navigateByUrl('/add-card', { state: data});
      });
  }



  public Delete_click(id: number) {
    this.http.delete(this.baseUrl + "api/reportcard/" + id)
      .subscribe(res => {
        if (res == 1) {
          this.ngOnInit();
        }
        this._snackBar.open("Delete Data Successfully.", "", { duration: 10 * 1000 });
      });
  }

}
