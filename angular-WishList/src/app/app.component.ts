import { Component } from '@angular/core';
import { observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-WishList';
  // time = new observable(observer => {
  //   setInterval(() => observer.next(new Date().toString()), 1000);
  // });
}
