import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailPanelComponent } from './user-detail-panel.component';

describe('UserDetailPanelComponent', () => {
  let component: UserDetailPanelComponent;
  let fixture: ComponentFixture<UserDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
