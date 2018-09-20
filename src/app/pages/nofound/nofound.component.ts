import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-nofound',
  templateUrl: './nofound.component.html'
})
export class NofoundComponent implements OnInit {
  userUrl = '';
  email = '';
  constructor(
      private route: Router
  ) { }

  ngOnInit() {}

}
