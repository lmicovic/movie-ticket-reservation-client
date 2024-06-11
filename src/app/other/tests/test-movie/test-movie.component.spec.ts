import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMovieComponent } from './test-movie.component';

describe('TestMovieComponent', () => {
  let component: TestMovieComponent;
  let fixture: ComponentFixture<TestMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
