import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvfiltermodalComponent } from './advfiltermodal.component';

describe('AdvfiltermodalComponent', () => {
  let component: AdvfiltermodalComponent;
  let fixture: ComponentFixture<AdvfiltermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvfiltermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvfiltermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
