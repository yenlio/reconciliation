import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./presentation/admin/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./presentation/admin/forgot-password/forgot.module').then(
        (m) => m.ForgotModule
      ),
  },
  {
    path: 'first-login',
    loadChildren: () =>
      import('./presentation/admin/forgot-password/forgot.module').then(
        (m) => m.ForgotModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./presentation/layouts.module').then((m) => m.LayoutsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./presentation/admin/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./presentation/admin/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
