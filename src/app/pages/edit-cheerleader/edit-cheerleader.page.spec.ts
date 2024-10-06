import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCheerleaderPage } from './edit-cheerleader.page';

describe('EditCheerleaderPage', () => {
  let component: EditCheerleaderPage;
  let fixture: ComponentFixture<EditCheerleaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCheerleaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
