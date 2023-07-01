import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleCategoryService {
  private titleSubject = new Subject<string>();
  public title$ = this.titleSubject.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
