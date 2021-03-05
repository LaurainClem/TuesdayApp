import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExigenceModel, ExigenceType } from '../models/exigence.model';
import { ExigencesService } from '../services/exigences.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-exigences',
  templateUrl: './exigences.component.html',
  styleUrls: ['./exigences.component.scss'],
})
export class ExigencesComponent implements OnInit {
  exigences: ExigenceModel[];

  constructor(
    private readonly exigenceService: ExigencesService,
    private route: ActivatedRoute,
    private readonly sharedService: SharedService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.exigenceService
      .FindAll(+this.route.snapshot.paramMap.get('idProject'))
      .subscribe(
        (r) => {
          this.exigences = r;
        },
        () => {
          this.sharedService.ShowErrorNotification();
        }
      );
  }

  GetExigenceTypeLabel(exigenceType: ExigenceType): string {
    return ExigenceType[exigenceType];
  }

  GetProjectId(): number {
    return +this.route.snapshot.paramMap.get('idProject');
  }

  Delete(exigence: ExigenceModel) {
    this.exigenceService
      .Delete(this.GetProjectId(), exigence.id)
      .subscribe((r) => {
        this.exigences = r;
      });
  }
}
