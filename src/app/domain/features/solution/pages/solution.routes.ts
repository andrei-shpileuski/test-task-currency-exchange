import { Routes } from '@angular/router';

export const solutionRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@app/domain/features/solution/pages/solution-page/solution-page.component'
      ).then((mod) => mod.SolutionPageComponent),
  },
];
