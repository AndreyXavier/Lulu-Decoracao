import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabcadastroPage } from './tabcadastro.page';

describe('TabcadastroPage', () => {
  let component: TabcadastroPage;
  let fixture: ComponentFixture<TabcadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
