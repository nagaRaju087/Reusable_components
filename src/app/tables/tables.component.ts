import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  data: any = [];
  nameSort:boolean=false;
  mobileSort:boolean=false;
  dobSort:boolean=false;

  constructor(private api: ApiserviceService) { }
  ngOnInit(): void {
    this.getDataFromAPI();
  }
  getDataFromAPI() {
    this.api.usersocunt()
      .subscribe(
        (response) => {
          // Handle the response data here
          this.data = response;
          console.log("this is corresponding APIS", this.data);
        },
        (error) => {
          // Handle the error here if needed
          console.error('Error fetching data:', error);
        }
      );
  }
  sortItem(sort:any,ordvarible:any) {
    if(sort=='nameSort'){
      this.mobileSort=false;
      this.dobSort=false;
      this.nameSort = !this.nameSort;
    }
    else if(sort=='mobileSort'){
      this.mobileSort = !this.mobileSort;
      this.dobSort=false;
      this.nameSort = false
    }
    else{
      this.dobSort = !this.dobSort;
      this.mobileSort = false
      this.nameSort = false
    }
    let body={
      sortToAPI:sort,
      ord:ordvarible
    }
    console.log("this is corresponding body",body);
    this.api.sortAPIcall(body).subscribe((response) => {
    },
    (error) => {
      // Handle the error here if needed
      console.error('Error fetching data:', error);
    }
  );
  }

}
