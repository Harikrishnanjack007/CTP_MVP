import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvlistComponent } from './csvlist.component';

describe('CsvlistComponent', () => {
  let component: CsvlistComponent;
  let fixture: ComponentFixture<CsvlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
