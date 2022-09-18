import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolBarComponent } from './search-tool-bar.component';

describe('SearchToolBarComponent', () => {
  let component: SearchToolBarComponent;
  let fixture: ComponentFixture<SearchToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchToolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
