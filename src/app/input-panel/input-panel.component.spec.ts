import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPanelComponent } from './input-panel.component';
import { Observable } from 'rxjs';
import { LinkService } from '../link.service';

describe('InputPanelComponent', () => {
  let component: InputPanelComponent;
  /* let fixture: ComponentFixture<InputPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  beforeEach(() => {
    const fakeLinkService = {
      parent$: Observable.create((observer) => {
        observer.next('fake.parent.url');
      })
    };
    component = new InputPanelComponent(fakeLinkService as LinkService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should display the fake parent url', () => {
    expect(component.parent).toEqual('fake.parent.url');
  });*/
});
