import { Component,OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
  
})
export class HeaderNavbarComponent implements OnInit {
  public schoolName = environment.SCHOOL_NAME;
  nav:boolean = false;

  constructor() {}

  ngOnInit(): void {
  }
  hamburgerMenu(val:boolean){
    if(val==true){
      this.nav = true;
    }else if(val==false){
      this.nav = false;
    }
  }

}
