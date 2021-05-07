import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesPageComponent } from './statuses-page.component';

describe('StatusesPageComponent', () => {
  let component: StatusesPageComponent;
  let fixture: ComponentFixture<StatusesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
