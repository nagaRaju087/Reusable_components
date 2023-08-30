import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblWithSearchbarsComponent } from './tbl-with-searchbars.component';

describe('TblWithSearchbarsComponent', () => {
  let component: TblWithSearchbarsComponent;
  let fixture: ComponentFixture<TblWithSearchbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblWithSearchbarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblWithSearchbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
