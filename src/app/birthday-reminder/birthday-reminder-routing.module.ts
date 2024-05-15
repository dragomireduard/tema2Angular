import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';

const routes: Routes = [
  { path: '', component: FriendsTableComponent },
  { path: 'add-friend', component: AddFriendComponent },
  { path: 'edit-friend/:id', component: FriendEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdayReminderRoutingModule { }
