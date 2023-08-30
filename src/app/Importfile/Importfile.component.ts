import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-Importfile',
  templateUrl: './Importfile.component.html',
  styleUrls: ['./Importfile.component.css']
})
export class ImportfileComponent {
  csvDatatojson: any[] = [];
  jsonDataexcel: any[] = [];
  jsondata: any[] = [];
  showError:boolean=false;
  registration!: FormGroup;
  constructor(public formBuilder: FormBuilder,private api: ApiserviceService) { }
  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      selectedFile: ['', [Validators.required]],
    })
  }
  onSubmit() {
    this.showError=true;
    if (this.registration.valid) {
      console.log("this is correspondig file value", this.registration.value.selectedFile);
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'File successfully completed',
      }).then((isConfirm) => {
        if (isConfirm){
          this.registration.reset();
          this.showError=false;

        }
      });
    }
  }
  get formControls() {
    return this.registration.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        try {
          const jsonfilter = JSON.parse(contents);
          this.jsondata = jsonfilter
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }
  //////---------------------csv table------------------


  onFileSelectedforcv(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        this.csvDatatojson = this.convertCsvToJson(contents);
      };
      reader.readAsText(file);
    }
  }

  convertCsvToJson(csvText: string): any[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cells = lines[i].split(',');
      const rowData: any = {};

      for (let j = 0; j < cells.length; j++) {
        rowData[headers[j]] = cells[j].trim();
      }

      data.push(rowData);
    }

    return data;
  }

  convertAndRender() {
    console.log('JSON Data:', this.csvDatatojson);
  }


  // ------------------excel--------------------------------


  onFileSelectedexel(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        this.jsonDataexcel = this.convertExcelToJson(data);
      };
      reader.readAsArrayBuffer(file);
    }
  }
  convertExcelToJson(data: any): any[] {
    const workbook = XLSX.read(data, { type: 'array' });
    const singleunit = [];
    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const sheetName = workbook.SheetNames[i];
      const sheet = workbook.Sheets[sheetName];
      const jsonDataexcel = XLSX.utils.sheet_to_json(sheet);
      singleunit.push(...jsonDataexcel);
    }
    return singleunit;
  }
  convertAndRenderexcel() {
    console.log('JSON Data:', this.jsonDataexcel);
  }
  filehandle(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;

      if (fileType === 'application/json') {
        this.onFileSelected(event)
      } else if (fileType === 'text/csv') {
        this.onFileSelectedforcv(event);
      } else {
        this.onFileSelectedexel(event);
      }
    }
  }
  fileSubmission() {
    if (this.jsonDataexcel.length != 0) {
      console.log("this is respective jsonDataexcel", this.jsonDataexcel)
      let body={
        searchedelements:this.jsonDataexcel
      }
      this.api.sortAPIcall(body).subscribe((response) => {
      })
    } else if (this.csvDatatojson.length != 0) {
      console.log("this is respective csvDatatojson", this.csvDatatojson)
      let body={
        searchedelements:this.csvDatatojson
      }
      this.api.sortAPIcall(body).subscribe((response) => {
      })
    } else if (this.jsondata.length != 0) {
      console.log("this is respective json data", this.jsondata)
      let body={
        searchedelements:this.jsondata
      }
      this.api.sortAPIcall(body).subscribe((response) => {
      })
    } else {
      console.log("nothing to print here")
    }
  }
}
