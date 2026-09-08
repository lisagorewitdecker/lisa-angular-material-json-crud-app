import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {of} from 'rxjs';
import {EmpAddEditComponent} from './emp-add-edit.component';
import {EmployeeService} from '../services/employee.service';
import {CoreService} from '../core/core.service';

describe('EmpAddEditComponent', () => {
  let component: EmpAddEditComponent;
  let fixture: ComponentFixture<EmpAddEditComponent>;
  const dialogRefSpy = {close: vi.fn()};
  const employeeServiceSpy = {
    addEmployee: vi.fn().mockReturnValue(of({})),
    updateEmployee: vi.fn().mockReturnValue(of({})),
  };
  const coreServiceSpy = {openSnackBar: vi.fn()};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpAddEditComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: null},
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: CoreService, useValue: coreServiceSpy},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmpAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trim and normalize submitted form values', () => {
    component.empForm.setValue({
      firstName: ' Lisa ',
      lastName: ' Gore ',
      email: 'test@example.com',
      dob: new Date('2024-01-02T00:00:00Z'),
      gender: 'female',
      education: 'College Degree',
      company: ' Example Co ',
      experience: '5',
      compensation: '5000',
    });

    component.onFormSubmit();

    expect(employeeServiceSpy.addEmployee).toHaveBeenCalledWith({
      firstName: 'Lisa',
      lastName: 'Gore',
      email: 'test@example.com',
      dob: '2024-01-02',
      gender: 'female',
      education: 'College Degree',
      company: 'Example Co',
      experience: 5,
      compensation: 5000,
    });
  });
});
