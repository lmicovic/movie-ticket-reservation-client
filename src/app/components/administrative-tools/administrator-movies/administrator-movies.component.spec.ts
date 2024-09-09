import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMoviesComponent } from './administrator-movies.component';

describe('AdministratorMoviesComponent', () => {
  let component: AdministratorMoviesComponent;
  let fixture: ComponentFixture<AdministratorMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
