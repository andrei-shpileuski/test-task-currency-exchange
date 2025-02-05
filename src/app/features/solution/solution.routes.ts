import { Routes } from '@angular/router';

export const solutionRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@app/features/solution/solution-page/solution-page.component'
      ).then((mod) => mod.SolutionPageComponent),
  },
];
