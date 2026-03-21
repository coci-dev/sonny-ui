import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { SnySheetService } from './sheet.service';
import {
  SnySheetHeaderDirective,
  SnySheetTitleDirective,
  SnySheetDescriptionDirective,
  SnySheetCloseDirective,
} from './sheet.directives';
import { SnyButtonDirective } from '../button/button.directive';

@Component({
  standalone: true,
  imports: [
    SnySheetHeaderDirective,
    SnySheetTitleDirective,
    SnySheetDescriptionDirective,
    SnySheetCloseDirective,
    SnyButtonDirective,
  ],
  template: `
    <div>
      <div snySheetHeader>
        <h2 snySheetTitle>Test Sheet</h2>
        <p snySheetDescription>A test sheet.</p>
      </div>
      <button snySheetClose aria-label="Close">X</button>
      <button snyBtn (click)="dialogRef.close('done')">Done</button>
    </div>
  `,
})
class TestSheetComponent {
  readonly dialogRef = inject(DialogRef);
}

describe('SnySheetService', () => {
  let service: SnySheetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModule],
    }).compileComponents();

    service = TestBed.inject(SnySheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a sheet', () => {
    const ref = service.open(TestSheetComponent, { side: 'right' });
    expect(ref).toBeTruthy();
    ref.close();
  });

  it('should open from different sides', () => {
    const refLeft = service.open(TestSheetComponent, { side: 'left' });
    expect(refLeft).toBeTruthy();
    refLeft.close();

    const refTop = service.open(TestSheetComponent, { side: 'top' });
    expect(refTop).toBeTruthy();
    refTop.close();
  });
});
