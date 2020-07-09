import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexInputComponent } from './regex-input.component';

describe('RegexInputComponent', () => {
  let component: RegexInputComponent;
  let fixture: ComponentFixture<RegexInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegexInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
