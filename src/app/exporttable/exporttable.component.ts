import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-exporttable',
  templateUrl: './exporttable.component.html',
  styleUrls: ['./exporttable.component.css']
})
export class ExporttableComponent {
  data:any=[];
  constructor(private api: ApiserviceService){}
  table_Data: any=[]

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  getDataFromAPI(){
    this.api.usersocunt()
      .subscribe(
        (response) => {
          // Handle the response data here
          this.data = response;
          this.table_Data=this.data
          console.log("this is corresponding APIS",this.table_Data);
        },
        (error) => {
          // Handle the error here if needed
          console.error('Error fetching data:', error);
        }
      );
  }
  downloadJSON(): void {
    const jsonData = JSON.stringify(this.table_Data?.users);
    this.downloadFile(jsonData, 'Usersdata.json', 'application/json');
  }

  private downloadFile(data: any, fileName: string, fileType: string): void {
    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }
  downloadCSV(): void {
    const csvContent = this.generateCSVContent();
    this.downloadFile(csvContent, 'USersData.csv', 'text/csv');
  }

  private generateCSVContent(): string {
    const csvRows = [];

    if (this.table_Data?.users.length > 0) {
      const headers = Object.keys(this.table_Data?.users?.[0]);
      csvRows.push(headers.join(','));

      this.table_Data?.users.forEach((row:any) => {
        const values = headers.map((header) => {
          if (typeof row[header] === 'object') {
            return row[header].name;
          } else {
            return row[header];
          }
        });
        csvRows.push(values.join(','));
      });
    }

    return csvRows.join('\n');
  }
  downloadExcel(): void {
    const excelData = this.generateExcelData();
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'UsersData.xlsx';
    link.click();
  
    URL.revokeObjectURL(url);
  }

  private generateExcelData(): any {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.table_Data?.users);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
    console.log('Generated Excel Data:', excelBuffer);
  
    return excelBuffer;
  }
  

  generatePDF() {
    console.log("this is corresponding item",this.table_Data?.users);
    const doc = new jsPDF();
    const col = ["S.No", "Name","Age","Gender","Blood Group",'Mail'];
    const rows :any[][]= [];
    const itemNew=this.table_Data?.users
    itemNew.forEach((element:any) => {      
      const temp = [element?.id, element?.firstName,element?.age,element?.gender,element?.bloodGroup,element?.email];
      rows.push(temp);
    });
    (doc as any).autoTable({
      head: [col],
      body: rows,
    });
    doc.save('usersdata.pdf');
  }
}
