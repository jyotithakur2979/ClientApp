import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html'
})
export class AddCardComponent implements OnInit {
  public dataToUpdate: any;
  public status: boolean = false;



  public cardForm = new FormGroup({
    rollNo: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    hindi: new FormControl('', Validators.required),
    eng: new FormControl('', Validators.required),
    math: new FormControl('', Validators.required),
    phy: new FormControl('', Validators.required),
    chy: new FormControl('', Validators.required)
  });



  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl, private router: Router) {
    
    let data = this.router.getCurrentNavigation().extras.state;
    if (data != null) {
      this.dataToUpdate = data;
      this.cardForm.controls["rollNo"].setValue(this.dataToUpdate.rollNo);
      this.cardForm.controls["name"].setValue(this.dataToUpdate.name);
      this.cardForm.controls["hindi"].setValue(this.dataToUpdate.hindi);
      this.cardForm.controls["eng"].setValue(this.dataToUpdate.eng);
      this.cardForm.controls["math"].setValue(this.dataToUpdate.maths);
      this.cardForm.controls["phy"].setValue(this.dataToUpdate.phs);
      this.cardForm.controls["chy"].setValue(this.dataToUpdate.chy);
    }
  }

  ngOnInit() {
    

  }

  public saveData(): void {

    if (this.cardForm.valid) {
      let data = this.cardForm.value;
      let formData = {
        "name": data.name,
        "phs": parseInt(data.phy),
        "hindi": parseInt(data.hindi),
        "eng": parseInt(data.eng),
        "maths": parseInt(data.math),
        "chy": parseInt(data.chy),
        "rollno": data.rollNo
      };
      this.http.post(this.baseUrl + "api/reportcard", formData)
        .subscribe(result => {
          if (result == 1) {
            this.status = true;
            this.cardForm.reset();
          }
        });
    } else {
      alert('Forms value are empty. Please fill form');
    }
  }
}
