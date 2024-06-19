import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabSelected = new Subject<string>();

  tabSelected$ = this.tabSelected.asObservable();

  selectTab(tab: string) {
    this.tabSelected.next(tab);
  }
}
