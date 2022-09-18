import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSnackbarComponent } from './cart-snackbar.component';

describe('CartSnackbarComponent', () => {
  let component: CartSnackbarComponent;
  let fixture: ComponentFixture<CartSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
