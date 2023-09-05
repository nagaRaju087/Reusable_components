import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdvfiltermodalComponent } from '../advfiltermodal/advfiltermodal.component';
import { ModalDataService } from '../modal-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';


interface Employee {
  sno: number;
  name: string;
  email: string;
  salary: number;
  address: string;
  age: number;
  gender: string;
}
const regexArray: { name: string; regex: RegExp }[] = [
  {
    name: "email",
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  {
    name: "salary",
    regex: /^[0-9]+$/
  },
  {
    name: "firstname",
    regex: /^[A-Za-z\s]+$/ // Assumes a simple rule for first names
  },
  {
    name: "gender",
    regex: /^(male|female|non-binary|other)$/i // Example for gender
  },
  {
    name: "college",
    regex: /^[A-Za-z\s]+$/ // Assumes a simple rule for college names
  },
  // Add more objects with different regex patterns and names as needed
];

@Component({
  selector: 'app-multiplesearch',
  templateUrl: './multiplesearch.component.html',
  styleUrls: ['./multiplesearch.component.css']
})
export class MultiplesearchComponent {
  showSuggestions = false;
  searchResult: any = [];
  visible_searchResult: any = [];
  submittedDataone: any = [];
  submittedDatatwo: any = [];
  Searchideas: any = [];
  selectedvalues: any = [];
  updatedselectedvalues: any[] = [];
  employees: Employee[] = [
    {
      sno: 1,
      name: 'John Doe',
      email: 'john@example.com',
      salary: 50000,
      address: '123 Main St, City',
      age: 30,
      gender: 'Male'
    },
    {
      sno: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      salary: 60000,
      address: '456 Elm St, Town',
      age: 28,
      gender: 'Female'
    },
    {
      sno: 3,
      name: 'Michael Johnson',
      email: 'michael@example.com',
      salary: 75000,
      address: '789 Oak St, Village',
      age: 35,
      gender: 'Male'
    },
    {
      sno: 4,
      name: 'Emily Williams',
      email: 'emily@example.com',
      salary: 55000,
      address: '101 Pine St, Suburb',
      age: 29,
      gender: 'Female'
    },
    {
      sno: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      salary: 70000,
      address: '234 Maple St, Rural',
      age: 32,
      gender: 'Male'
    },
  ];
  searchform!: FormGroup;
  advfilterform!: FormGroup;
  showDatePicker = false;
  submittedData: any
  constructor(private formBuilder: FormBuilder, private ModeldataService: ModalDataService, private dialog: MatDialog,private api: ApiserviceService) {
  }
  ngOnInit(): void {
    this.searchform = this.formBuilder.group({
      suggestionSearch: ['', Validators.required],
    });
    this.advfilterform = this.formBuilder.group({
      UpdatedDate: ['',],
      Mobilenumber: ['',],
      CreatedDate: ['',]
    })
    this.submittedData = this.ModeldataService.getData();
  }
  onSearchInput(event: any): void {

    const inputValue = event.target.value;
    if (inputValue.length >= 3) {
      this.searchResult = this.filterSearchResults(inputValue);
      this.showSuggestions = this.searchResult.length > 0;
    } else if (inputValue.length < 3) {
      this.searchResult = [];
      this.showSuggestions = false;
    }
  }
  filterSearchResults(inputValue: string): string[] {
    this.Searchideas = [];
    for (const item of regexArray) {
      if (item.regex.test(inputValue)) {
        this.Searchideas.push(item)
      }
    }
    // for(let duplicateremoval of this.selectedvalues){
    //   for(let duplicateremoval2 of this.Searchideas){
    //     if(duplicateremoval.key.includes(duplicateremoval2.name)){
    //       var indexs = this.Searchideas.indexOf(duplicateremoval2);
    //       this.Searchideas.splice(indexs, 1);
    //     }
    //   }
    // }
    return this.Searchideas
  }

  selectSuggestion(suggestion: any): void {
    let option: any;
    option = {
      key: suggestion.name,
      value: this.searchform.value.suggestionSearch
    }
    this.selectedvalues.forEach((item:any) => {
      if(option.key.includes(item.key)){
        let index=this.selectedvalues.indexOf(item);
        this.selectedvalues.splice(index, 1);
      }
    });
    this.selectedvalues.push(option);
    this.searchform.reset();
    this.updatedselectedvalues = [...this.selectedvalues]
    this.showSuggestions = false;
  }
  popvalue(deletedvalue: any) {
    console.log("this console is for pop vlaues",deletedvalue);
    
    var indexs = this.selectedvalues.indexOf(deletedvalue);
    this.selectedvalues.splice(indexs, 1);
    var index2 = this.visible_searchResult.indexOf(deletedvalue);
    this.visible_searchResult.splice(index2, 1);
    let body={
      searchedelements:this.visible_searchResult
    }
    this.api.sortAPIcall(body).subscribe((response) => {
    })
  }
  popvalueadvfilter(deletedvalue: any) {
    var index3 = this.submittedDatatwo.indexOf(deletedvalue);
    this.submittedDatatwo.splice(index3, 1);
    let body={
      searchedelements:this.visible_searchResult
    }
    this.api.sortAPIcall(body).subscribe((response) => {
    })
  }
  submitvalues() {
    this.visible_searchResult = this.updatedselectedvalues;
  }
  openDialog() {
    let data: { [key: string]: string } = {};

    for (const pair of this.submittedDatatwo) {
      data[pair.key] = pair.value;
    }
    this.ModeldataService.setData(data);
    this.ModeldataService.openDialog(data, AdvfiltermodalComponent, 'auto');
    this.ModeldataService.getfilterData().subscribe((res) => {
      this.submittedDataone = res[res.length-1];
 
      const key_value_pairs: { key: string, value: string }[] = [];

      for (const key in this.submittedDataone) {
        if (this.submittedDataone.hasOwnProperty(key) && this.submittedDataone?.[key] !== undefined) {
          key_value_pairs.push({ key: key, value: this.submittedDataone?.[key] });
        }
      }

      this.submittedDatatwo = key_value_pairs;
      let body={
        searchedelements:this.submittedDatatwo
      }
      this.api.sortAPIcall(body).subscribe((response) => {
      })
    })
  }
}

