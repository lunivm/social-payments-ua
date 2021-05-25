import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public activeTab: 'users' | 'general' = 'general';

  constructor() { }

  ngOnInit() {}

}
