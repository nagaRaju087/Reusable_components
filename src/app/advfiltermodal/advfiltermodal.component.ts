import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalDataService } from '../modal-data.service';
import { Router } from '@angular/router';
import { MultiplesearchComponent } from '../multiplesearch/multiplesearch.component';

@Component({
  selector: 'app-advfiltermodal',
  templateUrl: './advfiltermodal.component.html',
  styleUrls: ['./advfiltermodal.component.css']
})
export class AdvfiltermodalComponent {
  Usernames: string[] = ['Sai', 'Mahesh', 'Sharief'];
  title = 'my-angular-app';
  Advfilterform !: FormGroup;
  submitted = false;
  message: any;
    constructor( public dialogRef: MatDialogRef<AdvfiltermodalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private ModeldataService: ModalDataService,private router: Router ) { }
    ngOnInit() {
      this.message = {
        message : "You have login Successfully",
        types:"success"
      }
      this.Advfilterform = this.formBuilder.group({
        Mobile: ['',],
        createdDate: ['',],
        updatedData: ['',],
        username: ['',],
        gender: ['',],
      });
      let submittedData = this.ModeldataService.getData();      
      this.Advfilterform.controls['createdDate'].setValue(submittedData?.[submittedData.length-1]?.createdDate);
      this.Advfilterform.controls['updatedData'].setValue(submittedData?.[submittedData.length-1]?.updatedData);
      this.Advfilterform.controls['Mobile'].setValue(submittedData?.[submittedData.length-1]?.Mobile);
      this.Advfilterform.controls['username'].setValue(submittedData?.[submittedData.length-1]?.username);
      this.Advfilterform.get('gender')!.setValue(submittedData?.[submittedData.length-1]?.gender);
    }
    // convenience getter for easy access to form fields
    get formreturntype() { return this.Advfilterform.controls; }
    SearchAdvFilterSubmission() {
      this.submitted = true;
      if (this.Advfilterform.valid)
      {
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
}
