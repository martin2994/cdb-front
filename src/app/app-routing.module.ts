import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesComponent} from './company/companies/companies.component';
import {CompanyCreateComponent} from './company/company-create/company-create.component';
import {CompanyUpdateComponent} from './company/company-update/company-update.component';
import {CompanyDetailComponent} from './company/company-detail/company-detail.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent, pathMatch: 'full' },
  { path: 'company/create', component: CompanyCreateComponent, pathMatch: 'full'},
  { path: 'company/:id/update', component: CompanyUpdateComponent, pathMatch: 'full'},
  { path: 'company/:id', component: CompanyDetailComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'companies', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
