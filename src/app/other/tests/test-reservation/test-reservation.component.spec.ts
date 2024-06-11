import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReservationComponent } from './test-reservation.component';

describe('TestReservationComponent', () => {
  let component: TestReservationComponent;
  let fixture: ComponentFixture<TestReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
