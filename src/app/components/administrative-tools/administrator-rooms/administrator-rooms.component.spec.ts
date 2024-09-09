import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorRoomsComponent } from './administrator-rooms.component';

describe('AdministratorRoomsComponent', () => {
  let component: AdministratorRoomsComponent;
  let fixture: ComponentFixture<AdministratorRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
