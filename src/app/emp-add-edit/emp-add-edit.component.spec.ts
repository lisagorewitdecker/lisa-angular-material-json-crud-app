import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
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
      imports: [ReactiveFormsModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: null},
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: CoreService, useValue: coreServiceSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
      email: ' test@example.com ',
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
