import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorUsersComponent } from './administrator-users.component';

describe('AdministratorUsersComponent', () => {
  let component: AdministratorUsersComponent;
  let fixture: ComponentFixture<AdministratorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
