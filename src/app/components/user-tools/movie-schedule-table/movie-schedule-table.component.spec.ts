import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieScheduleTableComponent } from './movie-schedule-table.component';

describe('MovieScheduleTableComponent', () => {
  let component: MovieScheduleTableComponent;
  let fixture: ComponentFixture<MovieScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieScheduleTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
