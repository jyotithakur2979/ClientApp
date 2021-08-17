import { Component, OnInit ,} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-add-card-demo',
  templateUrl: './add-card-demo.component.html'
})
export class AddCardDemoComponent implements OnInit {

  public status: boolean = false;


  public cardForm = new FormGroup({
    rollno: new FormControl(''),
    name: new FormControl(''),
    hindi: new FormControl(''),
    eng: new FormControl(''),
    math: new FormControl(''),
    phy: new FormControl(''),
    chy: new FormControl('')
  })


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl) { }

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
        "math": parseInt(data.math),
        "chy": parseInt(data.chy),
        "rollno": parseInt(data.rollno)
      };
      this.http.post(this.baseUrl + "api/reportcard", formData)
        .subscribe(result => {
          if (result == 1) {
            this.status = true;
            this.cardForm.reset();
          }
        });
       

        }
    
      }
  
  }


