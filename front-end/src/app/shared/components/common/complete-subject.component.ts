import { UnsubscribableComponent } from './unsubscribable.component';

export class CompleteSubjectComponent extends UnsubscribableComponent {
  protected componentSubjects: {complete: () => void}[] = [];

  public ngOnDestroy() {
    super.ngOnDestroy();

    (this.componentSubjects || []).forEach(s => s.complete());
  }
}
