import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tbl-with-searchbars',
  templateUrl: './tbl-with-searchbars.component.html',
  styleUrls: ['./tbl-with-searchbars.component.css']
})
export class TblWithSearchbarsComponent implements OnInit{
  data: any = [];
  data2: any = [];
  UsersList: any = [];
  Usersearch:String='';
  searchform!: FormGroup;
  showSuggestions = false;
  originalSearchResult: string[] =[];
  searchResult: string[] = [];

  constructor(private api: ApiserviceService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.searchform = this.formBuilder.group({
      suggestionSearch: ['', Validators.required],
    });
    this.getDataFromAPI();
  }
  getDataFromAPI() {
    this.api.usersocunt()
      .subscribe(
        (response) => {
          // Handle the response data here
          this.data = response;
          this.data=this.data?.users;
          for(let user of this.data){
            this.originalSearchResult.push(user?.lastName);
          }
        },
        (error) => {
          // Handle the error here if needed
          console.error('Error fetching data:', error);
        }
      );
  }
  search(userSearch: string, num: any) {
    console.log("this is corresponding search",this.Usersearch);
    let userBody;
    let regEx =  /^[a-zA-Z][a-zA-Z0-9\s]*$/;
    if(this.Usersearch && this.Usersearch.match(regEx))
    {
    if (this.Usersearch.length >= 3) {
      userBody = {
        Name: this.Usersearch,
      };
    } else if (this.Usersearch.length <= 3 && this.Usersearch.length > 0) {
      Swal.fire({
        text: ' atleast 3 characters have to search',
        allowOutsideClick: false,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#003d7c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      })
    }
  }  else if (this.Usersearch && !this.Usersearch.match(regEx)) {
      Swal.fire({
        text: 'Search should start with an alphabet and cannot contain special characters',
        allowOutsideClick: false,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#003d7c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      })
    }
    this.api.postCall(userBody, num).subscribe(
      (res) => {
        this.UsersList = res;
      },
      (error) => {
        if(error &&  error.error && error.error.errorcode && error.error.errorcode == 411){
          Swal.fire({
            text: 'The search length must be greater than or equal to three characters',
            icon: 'warning',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#003d7c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
          })
        }
        else{
            // Handle error
        }
      }
        );
      }
      onSearchInput(event: any): void {
        const inputValue = event?.target?.value;
        
        if (inputValue.trim() === '') {
          console.log("this is corresponding Wordvalues");
          this.data2=[];
          this.searchResult = this.originalSearchResult;
          this.showSuggestions = false;
        } else {
          this.searchResult = this.filterSearchResults(inputValue);
          this.showSuggestions = this.searchResult?.length > 0;
        }
        
      }
    
      filterSearchResults(inputValue: string): string[] {
        // Implement your filtering logic here
        // Return an array of filtered search results based on inputValue
        return this.originalSearchResult.filter((clg) =>
          clg?.toLowerCase()?.includes(inputValue?.toLowerCase())
        );
      }

      selectSuggestion(suggestion: string): void {
        this.searchform.get('suggestionSearch')?.setValue(suggestion);
        const filteredData = this.data.filter((item:any) => item?.lastName.includes(suggestion));
        this.data2=filteredData
        console.log("this is the corresponding respo of searh result",this.data2);
        this.showSuggestions = false; // Hide suggestions after selection
      }
}
