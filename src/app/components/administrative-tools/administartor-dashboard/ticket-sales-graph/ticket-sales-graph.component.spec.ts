import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesGraphComponent } from './ticket-sales-graph.component';

describe('TicketSalesGraphComponent', () => {
  let component: TicketSalesGraphComponent;
  let fixture: ComponentFixture<TicketSalesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketSalesGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketSalesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
