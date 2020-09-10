import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPanelComponent } from './input-panel.component';
import { CrossComponentDataService } from '../cross-component-data.service';

describe('InputPanelComponent', () => {
  let component: InputPanelComponent;
  let fixture: ComponentFixture<InputPanelComponent>;
  let ccdService: CrossComponentDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputPanelComponent
      ],
      providers: [
        CrossComponentDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPanelComponent);
    component = fixture.componentInstance;
    ccdService = TestBed.get(CrossComponentDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the fake parent url', () => {
    const fakeParent = 'fake.parent.url';
    expect(component.parent).toBeFalsy();
    ccdService.updateParent(fakeParent);
    expect(component.parent).toEqual(fakeParent);
  });
});
