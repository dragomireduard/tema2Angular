import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'friends', pathMatch: 'full' },
  { path: 'friends', loadChildren: () => import('./birthday-reminder/birthday-reminder.module').then(m => m.BirthdayReminderModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
