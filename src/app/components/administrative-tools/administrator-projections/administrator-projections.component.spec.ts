import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorProjectionsComponent } from './administrator-projections.component';

describe('AdministratorProjectionsComponent', () => {
  let component: AdministratorProjectionsComponent;
  let fixture: ComponentFixture<AdministratorProjectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorProjectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorProjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
