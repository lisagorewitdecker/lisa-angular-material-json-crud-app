import {TestBed} from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CoreService} from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  const snackBarSpy = {open: vi.fn()};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: MatSnackBar, useValue: snackBarSpy}],
    });
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snack bar with the default action', () => {
    service.openSnackBar('Saved');

    expect(snackBarSpy.open).toHaveBeenCalledWith('Saved', 'ok', {
      duration: 1000,
      verticalPosition: 'top',
    });
  });
});
