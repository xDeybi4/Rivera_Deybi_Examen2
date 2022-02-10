import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesUsuariosComponent } from './operaciones-usuarios.component';

describe('OperacionesUsuariosComponent', () => {
  let component: OperacionesUsuariosComponent;
  let fixture: ComponentFixture<OperacionesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
