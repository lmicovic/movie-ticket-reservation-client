import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviewInformationComponent } from './moview-information.component';

describe('MoviewInformationComponent', () => {
  let component: MoviewInformationComponent;
  let fixture: ComponentFixture<MoviewInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviewInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
