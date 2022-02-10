import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoImgProdutoComponent } from './dialogo-img-produto.component';

describe('DialogoImgProdutoComponent', () => {
  let component: DialogoImgProdutoComponent;
  let fixture: ComponentFixture<DialogoImgProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoImgProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoImgProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
