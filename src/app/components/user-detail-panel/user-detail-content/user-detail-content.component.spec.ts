import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailContentComponent } from './user-detail-content.component';

describe('UserDetailContentComponent', () => {
  let component: UserDetailContentComponent;
  let fixture: ComponentFixture<UserDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
