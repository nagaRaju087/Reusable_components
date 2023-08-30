import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerncoroselComponent } from './moderncorosel.component';

describe('ModerncoroselComponent', () => {
  let component: ModerncoroselComponent;
  let fixture: ComponentFixture<ModerncoroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerncoroselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerncoroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
