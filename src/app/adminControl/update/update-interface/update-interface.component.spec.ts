import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterfaceComponent } from './update-interface.component';

describe('UpdateInterfaceComponent', () => {
  let component: UpdateInterfaceComponent;
  let fixture: ComponentFixture<UpdateInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
