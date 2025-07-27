import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvirtualComponent } from './avirtual.component';

describe('AvirtualComponent', () => {
  let component: AvirtualComponent;
  let fixture: ComponentFixture<AvirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvirtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
