import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProjectionComponent } from './test-projection.component';

describe('TestProjectionComponent', () => {
  let component: TestProjectionComponent;
  let fixture: ComponentFixture<TestProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
