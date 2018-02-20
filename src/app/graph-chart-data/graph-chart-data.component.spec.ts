import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphChartDataComponent } from './graph-chart-data.component';

describe('GraphChartDataComponent', () => {
  let component: GraphChartDataComponent;
  let fixture: ComponentFixture<GraphChartDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphChartDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
