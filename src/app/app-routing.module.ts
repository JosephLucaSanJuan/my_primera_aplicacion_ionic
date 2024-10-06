import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit-team',
    loadChildren: () => import('./pages/edit-team/edit-team.module').then( m => m.EditTeamPageModule)
  },
  {
    path: 'edit-cheerleader',
    loadChildren: () => import('./pages/edit-cheerleader/edit-cheerleader.module').then( m => m.EditCheerleaderPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/members/members.module').then( m => m.MembersPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
