import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorReservationsComponent } from './administrator-reservations.component';

describe('AdministratorReservationsComponent', () => {
  let component: AdministratorReservationsComponent;
  let fixture: ComponentFixture<AdministratorReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
