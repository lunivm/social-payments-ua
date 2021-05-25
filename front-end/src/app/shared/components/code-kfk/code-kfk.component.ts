import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DefaultPerfectScrollbarConfig } from '../../constants/default-perfect-scrollbar.config';
import { CodeKFKService } from './code-kfk.service';

@Component({
  selector: 'sp-code-kfk',
  templateUrl: './code-kfk.component.html',
  styleUrls: ['./code-kfk.component.scss']
})
export class CodeKFKComponent implements OnInit {
  public codeKFK = new FormControl('', Validators.required);

  constructor(public codeKFKService: CodeKFKService, public defaultPerfectScrollbarConfig: DefaultPerfectScrollbarConfig) { }

  ngOnInit() {
  }

}
