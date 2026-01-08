import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addbutton } from './addbutton';

describe('Addbutton', () => {
  let component: Addbutton;
  let fixture: ComponentFixture<Addbutton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addbutton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addbutton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
