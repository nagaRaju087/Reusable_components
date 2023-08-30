import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvfiltermodalComponent } from './advfiltermodal/advfiltermodal.component';
import{BehaviorSubject, Observable} from'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  private data: any[] = [];
  private showModal: boolean = false;
  private filterObs$:BehaviorSubject<any>=new BehaviorSubject(null);
  constructor(private dialog: MatDialog) {} // Inject the MatDialog service



 // Store an array of data


  setData(data: any) {
    this.data.push(data); // Add the new data to the array
  }

  getData() {
    return this.data; // Return the entire array of data
  }
setfilterdata(data:any){
  this.filterObs$.next(data);
}
getfilterData():Observable<any>{
  return this.filterObs$.asObservable();
}
  
  openDialog(data: any,Component: any,width: any): void {

    if (!this.showModal) {
      this.showModal = true; // Show the modal
      const dialogRef: MatDialogRef<AdvfiltermodalComponent> = this.dialog.open(Component, {
        width: 'auto',
        backdropClass: 'my-custom-dialog-backdrop',
        data: data,
        disableClose: true
      });
      
      dialogRef.afterClosed().subscribe(result => {
        this.showModal = false; // Close the mod
        this.setfilterdata(this.data);
      })
    }
  }
  closedialogbox(){

  }
}
