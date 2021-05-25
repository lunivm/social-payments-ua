import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FilterType } from '../shared/filter-type.enum';

@Component({
  selector: 'sp-filter-chip',
  template: '{{text}}<mat-icon class="sp-small-icon" (click)="onClose($event)" title="Очистити">cancel</mat-icon>',
  styleUrls: ['./filter-chip.component.scss']
})
export class FilterChipComponent implements OnInit {
  @Input() public text: string;
  @Input() public filterType: FilterType;

  @HostBinding('title')
  @Input()
  public title: string;

  @Output() close = new EventEmitter<FilterType>();

  constructor() {}

  public ngOnInit(): void {
    this.title = this.title || this.text;
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onClose(event: MouseEvent): void {
    event.stopPropagation();
    this.close.emit(this.filterType);
  }
}
