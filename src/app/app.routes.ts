import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@domain/features/welcome/pages/welcome-page/welcome-page.component'
      ).then((mod) => mod.WelcomePageComponent),
  },
  {
    path: 'task',
    loadComponent: () =>
      import('@domain/features/task/pages/task-page/task-page.component').then(
        (mod) => mod.TaskPageComponent,
      ),
  },
  {
    path: 'solution',
    loadChildren: () =>
      import('@domain/features/solution/pages/solution.routes').then(
        (mod) => mod.solutionRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
