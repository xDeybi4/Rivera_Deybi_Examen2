import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesClienteComponent } from './operaciones-cliente.component';

describe('OperacionesClienteComponent', () => {
  let component: OperacionesClienteComponent;
  let fixture: ComponentFixture<OperacionesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionesClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
