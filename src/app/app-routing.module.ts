import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { ImportfileComponent } from './Importfile/Importfile.component';
import { ExporttableComponent } from './exporttable/exporttable.component';
import { TblWithSearchbarsComponent } from './tbl-with-searchbars/tbl-with-searchbars.component';
import { MultiplesearchComponent } from './multiplesearch/multiplesearch.component';
import { CorosalTemplateComponent } from './corosal-template/corosal-template.component';
import { ModerncoroselComponent } from './moderncorosel/moderncorosel.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path:'multisearch',component:MultiplesearchComponent},
  {path:'navbar',component:NavbarComponent,
  children: [
    {path:'Importfile',component:ImportfileComponent},
    {path:'table',component:TablesComponent},
    {path:'exporttable',component:ExporttableComponent},
    {path:'tablewithsearchbars',component:TblWithSearchbarsComponent},
    {path:'corosal',component:CorosalTemplateComponent},
    {path:'moderncorosel',component:ModerncoroselComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
