import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@app/features/task/ui/pages/intro-page/intro-page.component'
        ).then((mod) => mod.IntroPageComponent),
  },
  {
    path: 'task',
    loadComponent: () =>
      import('@app/features/task/ui/pages/task-page/task-page.component').then(
        (mod) => mod.TaskPageComponent,
      ),
  },
  {
    path: 'solution',
    loadChildren: () =>
      import('@app/features/solution/solution.routes').then(
        (mod) => mod.solutionRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
