import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolOptionComponent } from './rol-option.component';

describe('RolOptionComponent', () => {
  let component: RolOptionComponent;
  let fixture: ComponentFixture<RolOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
