import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInterfaceComponent } from './create-interface.component';

describe('CreateInterfaceComponent', () => {
  let component: CreateInterfaceComponent;
  let fixture: ComponentFixture<CreateInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
