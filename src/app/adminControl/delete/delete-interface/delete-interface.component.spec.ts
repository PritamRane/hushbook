import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterfaceComponent } from './delete-interface.component';

describe('DeleteInterfaceComponent', () => {
  let component: DeleteInterfaceComponent;
  let fixture: ComponentFixture<DeleteInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
