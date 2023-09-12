import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalDataService } from '../modal-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advfiltermodal',
  templateUrl: './advfiltermodal.component.html',
  styleUrls: ['./advfiltermodal.component.css']
})
export class AdvfiltermodalComponent {
  title = 'my-angular-app';
  Advfilterform !: FormGroup;
  submitted = false;
  isformreset:boolean=false;
  message: any;
    constructor( public dialogRef: MatDialogRef<AdvfiltermodalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private ModeldataService: ModalDataService,private router: Router ) { }
    ngOnInit() {
      this.message = {
        message: "You have logged in Successfully",
        types: "success"
      }
    
      this.Advfilterform = this.formBuilder.group({
        Mobile: ['', [Validators.required]],
        createdDate: ['', Validators.required],
        updatedData: ['', Validators.required],
        username: ['', Validators.required],
        proficiency: ['', Validators.required],
      });
    
      let submittedData = this.ModeldataService.getData(); 
    
      this.Advfilterform.controls['createdDate'].setValue(submittedData?.[submittedData?.length-1]?.createdDate);
      this.Advfilterform.controls['updatedData'].setValue(submittedData?.[submittedData?.length-1]?.updatedData);
      this.Advfilterform.controls['Mobile'].setValue(submittedData?.[submittedData?.length-1]?.Mobile);
      this.Advfilterform.controls['username'].setValue(submittedData?.[submittedData?.length-1]?.username);
      this.Advfilterform.controls['proficiency'].setValue(submittedData?.[submittedData?.length - 1]?.proficiency);
    }
    // convenience getter for easy access to form fields
    get formControls() { return this.Advfilterform.controls; }
    SearchAdvFilterSubmission() {
      this.submitted = true;
      if (this.Advfilterform.valid)
      {
        this.isformreset=false;
        this.submitted = false;
        this.dialogRef.close();
      }
      this.dialogRef.afterClosed().subscribe(() => {
      });
        if (this.Advfilterform.invalid) {
            return;
        }
        const userData = this.Advfilterform.value;
        this.ModeldataService.setData(userData);
        this.dialogRef.close(`${userData}`);
    }
    getMaxDate(): string {
      const today = new Date();
      // Format the date as "YYYY-MM-DD" to match the format of the input element
      const formattedDate = today.toISOString().substring(0, 10);
      return formattedDate;
    }
    
    RestForm(){
      this.isformreset=true
      this.submitted = false;
      this.Advfilterform.reset();
    }
    closethemodal(){
      if(this.isformreset){
        this.ModeldataService.setData(null);
      }
      this.dialogRef.close(null);
    }
}
