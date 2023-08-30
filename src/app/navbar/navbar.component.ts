import { Component } from '@angular/core';
import { Footer_Content } from '../config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  show: boolean = true;
  chat: boolean = true;
  user: boolean = true;
  footer_content=Footer_Content.Content ;

  logout(){
    
  }
}
