import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompaniesComponent} from './companies/companies.component';
import {CompanyCreateComponent} from './company-create/company-create.component';
import {CompanyUpdateComponent} from './company-update/company-update.component';
import {CompanyComponent} from './company.component';
import {CompanyDetailComponent} from './company-detail/company-detail.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatPaginatorModule} from '@angular/material';
import { ComputersComponent } from './company-detail/computers/computers.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    ComputersComponent
  ]
})
export class CompanyModule { }
