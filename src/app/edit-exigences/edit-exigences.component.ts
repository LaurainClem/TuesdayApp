import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExigenceModel, ExigenceType } from '../models/exigence.model';
import { ExigencesService } from '../services/exigences.service';

@Component({
  selector: 'app-edit-exigences',
  templateUrl: './edit-exigences.component.html',
  styleUrls: ['./edit-exigences.component.scss'],
})
export class EditExigencesComponent implements OnInit {
  validateForm!: FormGroup;
  exigence: ExigenceModel;

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

    this.exigenceService
      .FindOne(
        +this.route.snapshot.paramMap.get('idProject'),
        +this.route.snapshot.paramMap.get('idExigence')
      )
      .subscribe((r) => {
        this.exigence = r;
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
        .Update(
          exigence,
          +this.route.snapshot.paramMap.get('idProject'),
          +this.route.snapshot.paramMap.get('idExigence')
        )
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

  GetExigence(id: number): string {
    return ExigenceType[id];
  }
}
