import {TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {AppComponent} from "./app.component";
import {AppModule} from './app.module';
import {CoreService} from './core/core.service';
import {EmployeeService} from './services/employee.service';

describe('AppComponent', () => {
  const employeeServiceSpy = {
    getEmployeeList: vi.fn().mockReturnValue(of([])),
    deleteEmployee: vi.fn().mockReturnValue(of({})),
  };
  const coreServiceSpy = {openSnackBar: vi.fn()};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: CoreService, useValue: coreServiceSpy},
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Crud Angular + Material');
  });
});
