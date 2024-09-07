import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviewPreviewComponent } from './moview-preview.component';

describe('MoviewPreviewComponent', () => {
  let component: MoviewPreviewComponent;
  let fixture: ComponentFixture<MoviewPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviewPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
