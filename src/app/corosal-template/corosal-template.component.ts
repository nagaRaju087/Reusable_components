import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-corosal-template',
  templateUrl: './corosal-template.component.html',
  styleUrls: ['./corosal-template.component.css'],
})
export class CorosalTemplateComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  cards = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'nineth', 'tenth', 'eleventh', 'twelth',
    'twelth', 'thirteen', 'fourteen', 'fifteen'
  ];

  constructor(private api: ApiserviceService){
  }
  ngOnInit(): void {
    this.api.usersocunt().subscribe((response) => {
    })
  }
  goNext() {
    console.log("this is left side",this.scrollContainer.nativeElement.clientWidth);
    
    this.scrollContainer.nativeElement.scrollBy({ left: this.scrollContainer.nativeElement.clientWidth });
  }

  goPrevious() {
    this.scrollContainer.nativeElement.scrollBy({ left: -this.scrollContainer.nativeElement.clientWidth });
  }
}
