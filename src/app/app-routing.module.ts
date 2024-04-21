import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cancel/:clientId/:guestId',
    loadComponent: () => import('./components/rejection-form/rejection-form.component')
      .then(c => c.RejectionFormComponent)
  },
  {
    path: 'invitation/:clientId',
    loadComponent: () => import('./components/invitation-form/invitation-form.component')
      .then(c => c.InvitationFormComponent),
  },
  {
    path: 'invitation/:clientId/:guestId',
    loadComponent: () => import('./components/invitation-form/invitation-form.component')
      .then(c => c.InvitationFormComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'invitation/:clientId'
  }
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
