import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExigenceModel, ExigenceType } from '../models/exigence.model';
import { ExigencesService } from '../services/exigences.service';

@Component({
  selector: 'app-add-exigences',
  templateUrl: './add-exigences.component.html',
  styleUrls: ['./add-exigences.component.scss'],
})
export class AddExigencesComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private readonly exigenceService: ExigencesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      label: [null, [Validators.required]],
      exigenceType: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const exigence = {
        label: this.validateForm.value.label,
        exigenceType: ExigenceType[this.validateForm.value.exigenceType],
      };
      this.exigenceService
        .Add(exigence, +this.route.snapshot.paramMap.get('idProject'))
        .subscribe(() => {
          this.router.navigate([
            'projects',
            +this.route.snapshot.paramMap.get('idProject'),
            'exigences',
          ]);
        });
    }
  }

  GetExigences(): string[] {
    const exigences = [];
    for (let exigence in ExigenceType) {
      var isValueProperty = parseInt(exigence, 10) >= 0;
      if (!isValueProperty) {
        exigences.push(exigence);
      }
    }
    return exigences;
  }
}
