import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdottoComponent } from './add-prodotto.component';

describe('AddProdottoComponent', () => {
  let component: AddProdottoComponent;
  let fixture: ComponentFixture<AddProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
