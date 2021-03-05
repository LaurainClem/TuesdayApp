import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExigencesComponent } from './edit-exigences.component';

describe('EditExigencesComponent', () => {
  let component: EditExigencesComponent;
  let fixture: ComponentFixture<EditExigencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExigencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExigencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
