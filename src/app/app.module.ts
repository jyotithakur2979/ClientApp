import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddCardDemoComponent } from './add-card-demo/add-card-demo.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModuleModule } from './mat-module/mat-module.module';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ClgComponent } from './clg/clg.component';
import { ClgListComponent } from './clg-list/clg-list.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';






@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomersComponent,
    AddCardComponent,
    AddCardDemoComponent,
    LoginComponent,
    RegistrationComponent,
    EmployeeComponent,
    EmployeeListComponent,
    ClgComponent,
    ClgListComponent,
    CountryComponent,
    CityComponent,
   
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModuleModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'add-card', component: AddCardComponent },
      { path: 'add-card-demo', component: AddCardDemoComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Registration', component: RegistrationComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'Clg', component: ClgComponent },
      { path: 'Clg-list', component: ClgListComponent },
      { path: 'country-list', component:CountryComponent},
      { path: 'city-list', component:CityComponent}
      
      
     
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
