import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutsComponent } from './layouts/layouts.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { AuthGuard } from '../guard/auth.guard';
import { PermissionGuard } from '../guard/permission.guard';
import { Role } from '../core/dto/role.dto';
import { Permission } from '../core/dto/permission.dto';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
  },
  {
    path: 'transaction/reconciliation',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./transaction/summary/summary.module').then(
        (m) => m.SummaryModule
      ),
    canActivate: [PermissionGuard],
    data: { permission: [Permission.SUMMARY] },
  },
  {
    path: 'transaction/reconciliation/napas/:startDate/:endDate/:status',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./transaction/napas/napas.module').then((m) => m.NapasModule),
    canActivate: [PermissionGuard],
    data: { permission: [Permission.UPDATE, Permission.VIEW] },
  },
  {
    path: 'transaction/reconciliation/acv/:startDate/:endDate/:status',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./transaction/acv/acv.module').then((m) => m.ACVModule),
    canActivate: [PermissionGuard],
    data: { permission: [Permission.UPDATE, Permission.VIEW] },
  },
  {
    path: 'handle-transaction',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./transaction/processing/processing.module').then(
        (m) => m.ProcessingModule
      ),
    canActivate: [PermissionGuard],
    data: { permission: [Permission.UPDATE] },
  },
  {
    path: 'users',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./admin/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'user-groups',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./admin/user-groups/user-groups.module').then(
        (m) => m.UserGroupsModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'rights-groups',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./admin/role-manager/role.module').then((m) => m.RoleModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'partners',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./admin/partners/partners.module').then((m) => m.PartnersModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.FREE] },
  },
];

@NgModule({
  declarations: [
    LayoutsComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes),MaterialModule],
  bootstrap: [LayoutsComponent],
})
export class LayoutsModule {}
