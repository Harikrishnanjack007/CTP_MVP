import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvFormComponent } from './csv-form.component';

describe('CsvFormComponent', () => {
  let component: CsvFormComponent;
  let fixture: ComponentFixture<CsvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
