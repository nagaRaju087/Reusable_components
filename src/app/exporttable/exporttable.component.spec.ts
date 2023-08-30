import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporttableComponent } from './exporttable.component';

describe('ExporttableComponent', () => {
  let component: ExporttableComponent;
  let fixture: ComponentFixture<ExporttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExporttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExporttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
