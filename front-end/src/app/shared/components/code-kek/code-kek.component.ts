import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CodeKEKService } from './code-kek.service';
import { DefaultPerfectScrollbarConfig } from '../../constants/default-perfect-scrollbar.config';

@Component({
  selector: 'sp-code-kek',
  templateUrl: './code-kek.component.html',
  styleUrls: ['./code-kek.component.scss']
})
export class CodeKEKComponent implements OnInit {
  public codeKEK = new FormControl('', Validators.required);

  constructor(public codeKEKService: CodeKEKService, public defaultPerfectScrollbarConfig: DefaultPerfectScrollbarConfig) { }

  ngOnInit() {
  }

}
