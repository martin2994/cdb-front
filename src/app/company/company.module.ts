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
import { ComputersComponent } from './company-detail/computers/computers.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../app.module';
import {HttpClient} from '@angular/common/http';
import { ComputerCreateComponent } from './company-detail/computer-create/computer-create.component';
import { ConfirmDialogComponent } from './companies/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    ComputersComponent,
    ComputerCreateComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CompanyModule { }
