import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdottoComponent } from './edit-prodotto.component';

describe('EditProdottoComponent', () => {
  let component: EditProdottoComponent;
  let fixture: ComponentFixture<EditProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
