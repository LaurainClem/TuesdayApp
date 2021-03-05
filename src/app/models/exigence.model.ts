export class ExigenceModel {
  id?: number;
  label: string;
  exigenceType: ExigenceType;
}

export enum ExigenceType {
  Fonctionnelle,
  Données,
  Performances,
  UI,
  Qualité,
  Services,
}
