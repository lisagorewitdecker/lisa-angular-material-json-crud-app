import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'High School Diploma',
    'College Degree',
    'Masters Degree',
    'Doctorate Degree',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.maxLength(100)]],
      lastName: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.email, Validators.maxLength(254)]],
      dob: [''],
      gender: [''],
      education: [''],
      company: ['', [Validators.maxLength(100)]],
      experience: ['', [Validators.min(0), Validators.max(80)]],
      compensation: ['', [Validators.min(0), Validators.max(1000000000)]],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const payload = this.sanitizeEmployeePayload();

      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, payload)
          .subscribe({
            next: () => {
              this._coreService.openSnackBar('Employee Updated!');
              this._dialogRef.close(true);
            },
            error: () => {
              this._coreService.openSnackBar('Unable to update employee.');
            },
          });
      } else {
        this._empService.addEmployee(payload).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee Added!');
            this._dialogRef.close(true);
          },
          error: () => {
            this._coreService.openSnackBar('Unable to add employee.');
          },
        });
      }
    }
  }

  private sanitizeEmployeePayload() {
    const value = this.empForm.getRawValue();

    return {
      firstName: value.firstName?.trim() ?? '',
      lastName: value.lastName?.trim() ?? '',
      email: value.email?.trim() ?? '',
      dob: this.normalizeDate(value.dob),
      gender: value.gender ?? '',
      education: value.education ?? '',
      company: value.company?.trim() ?? '',
      experience: this.normalizeNumber(value.experience),
      compensation: this.normalizeNumber(value.compensation),
    };
  }

  private normalizeDate(value: unknown): string {
    if (!value) {
      return '';
    }

    const date = new Date(value as string | number | Date);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  }

  private normalizeNumber(value: unknown): number | null {
    if (value === '' || value === null || value === undefined) {
      return null;
    }

    const numericValue = Number(value);

    return Number.isFinite(numericValue) ? numericValue : null;
  }
}
