import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavSnackbarComponent } from './fav-snackbar.component';

describe('FavSnackbarComponent', () => {
  let component: FavSnackbarComponent;
  let fixture: ComponentFixture<FavSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
