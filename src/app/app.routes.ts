import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@app/environment/ui/pages/welcome-page/welcome-page.component'
        ).then((mod) => mod.WelcomePageComponent),
  },
  {
    path: 'task',
    loadComponent: () =>
      import('@app/environment/ui/pages/task-page/task-page.component').then(
        (mod) => mod.TaskPageComponent,
      ),
  },
  {
    path: 'solution',
    loadChildren: () =>
      import('@app/features/solution/ui/pages/solution.routes').then(
        (mod) => mod.solutionRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
