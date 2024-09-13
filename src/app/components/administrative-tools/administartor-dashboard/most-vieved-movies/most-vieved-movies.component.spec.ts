import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostVievedMoviesComponent } from './most-vieved-movies.component';

describe('MostVievedMoviesComponent', () => {
  let component: MostVievedMoviesComponent;
  let fixture: ComponentFixture<MostVievedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostVievedMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostVievedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
