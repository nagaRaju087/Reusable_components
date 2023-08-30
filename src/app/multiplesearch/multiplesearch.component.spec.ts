import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplesearchComponent } from './multiplesearch.component';

describe('MultiplesearchComponent', () => {
  let component: MultiplesearchComponent;
  let fixture: ComponentFixture<MultiplesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplesearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
