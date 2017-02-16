import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public titleService: Title
  ) { }

  ngOnInit() {
    // title
    this.titleService.setTitle('Home');
  }

}
