import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import * as _ from 'lodash';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable.component';
import { TabbedItemConfig, TabbedItemsConfig } from './tabbed-items-config.model';
import { TabbedItemsService } from './tabbed-items.service';
import { TabItemMessageModel } from './tab-item-message.model';

export interface TabbedItemConfigInner extends TabbedItemConfig {
  sticky?: boolean;
}

@Component({
  selector: 'sp-tabbed-items',
  templateUrl: './tabbed-items.component.html',
  styleUrls: ['./tabbed-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbedItemsComponent extends UnsubscribableComponent implements OnInit, AfterViewInit {
  @Input() public set items(val: TabbedItemsConfig) {
    this.availableTabs = (val.list || []).concat();

    this.openedTabs = (val.pinnedTabs || [])
      .map((item: TabbedItemConfigInner) => Object.assign({sticky: true}, item));
  }

  public availableTabs: TabbedItemConfig[] = [];
  public openedTabs: TabbedItemConfigInner[] = [];
  public selectedIndex: number;

  @ViewChildren('tabContent', {
    read: ViewContainerRef
  }) private tabContentRef: QueryList<ViewContainerRef>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    private tabbedItemsService: TabbedItemsService
  ) {
    super();
  }

  public ngOnInit() {
    this.componentSubscriptions.add(this.tabbedItemsService.closeActiveTab$
      .subscribe((index) => {
        if (this.selectedIndex >= 0) {
          this.closeTab(this.selectedIndex);
        }

        if (index !== null) {
          this.selectedIndex = index;
        }

        this.cdRef.detectChanges();
      }));

    this.componentSubscriptions.add(this.tabbedItemsService.openTab$
      .subscribe((tabMessage: TabItemMessageModel) => {
        this.addTab(tabMessage.tab, tabMessage.inputs);
      }));
  }

  public ngAfterViewInit() {
    // first round only pinned tabs have a container created by ngFor
    const views = this.tabContentRef.toArray();

    views.forEach((view: any, index: number) => {
      this.loadComponent(this.openedTabs[index].component, view);
    });
  }

  public addTab(item: TabbedItemConfig, inputs?: any) {
    if (item.singleInstance && this.activateSingleTab(item)) {
      return;
    }

    this.createTab(item, inputs);
  }

  public closeTab(index: number) {
    this.openedTabs.splice(index, 1);
  }

  private loadComponent(component: any, container: ViewContainerRef, inputs?: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    container.clear();
    const compRef = container.createComponent(componentFactory);

    if (!_.isEmpty(inputs)) {
      Object.assign(compRef.instance, inputs);
    }

    this.addClass(compRef);
  }

  private addClass(cmp: ComponentRef<any>) {
    this.renderer.addClass(cmp.location.nativeElement, 'sp-tabbed-item-inserted');
  }

  private createTab(item: TabbedItemConfig, inputs?: any) {
    // using new object is mandatory otherwise tabs are not working correctly
    this.openedTabs.push(Object.assign({}, item));
    this.selectedIndex = this.openedTabs.length - 1;

    // let ngFor create new container from ng-template
    this.cdRef.detectChanges();

    // load component
    this.loadComponent(this.openedTabs[this.openedTabs.length - 1].component, this.tabContentRef.last, inputs);
  }

  private activateSingleTab(item: TabbedItemConfig): boolean {
    const tabIndex = _.findIndex(this.openedTabs, {component: item.component});
    const isValid = tabIndex >= 0;

    if (isValid) {
      this.selectedIndex = tabIndex;
    }

    return isValid;
  }
}
