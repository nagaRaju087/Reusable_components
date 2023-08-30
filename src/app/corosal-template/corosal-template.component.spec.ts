import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorosalTemplateComponent } from './corosal-template.component';

describe('CorosalTemplateComponent', () => {
  let component: CorosalTemplateComponent;
  let fixture: ComponentFixture<CorosalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorosalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorosalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
