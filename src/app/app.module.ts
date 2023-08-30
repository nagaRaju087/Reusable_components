import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImportfileComponent } from './Importfile/Importfile.component';
import { ExporttableComponent } from './exporttable/exporttable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';
import { FormsModule } from '@angular/forms'; 
import { AuthInterceptor } from './auth-interceptor';
import { TblWithSearchbarsComponent } from './tbl-with-searchbars/tbl-with-searchbars.component';
import { MultiplesearchComponent } from './multiplesearch/multiplesearch.component';
import { CorosalTemplateComponent } from './corosal-template/corosal-template.component';
import { ModerncoroselComponent } from './moderncorosel/moderncorosel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AdvfiltermodalComponent } from './advfiltermodal/advfiltermodal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    ImportfileComponent,
    ExporttableComponent,
    NumbersOnlyDirective,
    CapitalizeFirstLetterPipe,
    TblWithSearchbarsComponent,
    MultiplesearchComponent,
    CorosalTemplateComponent,
    ModerncoroselComponent,
    NavbarComponent,
    AdvfiltermodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
