import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdayReminderRoutingModule } from './birthday-reminder-routing.module';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';

import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';
import { NzTableModule } from 'ng-zorro-antd/table'; // Import the NzTableModule from the ng-zorro-antd/table package
import { Router, RouterModule } from '@angular/router';
import { BirthdayReminderComponent } from './birthday-reminder.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    FriendsTableComponent,
    AddFriendComponent,
    FriendEditComponent,
    BirthdayReminderComponent
  ],
  imports: [
    CommonModule,
    BirthdayReminderRoutingModule,
    ReactiveFormsModule,
    NzTableModule,
    RouterModule,
    NzTableModule,
    NzIconModule,
    NzPaginationModule
    
  ],
  exports: [
    FriendsTableComponent,
    AddFriendComponent,
    FriendEditComponent,
    BirthdayReminderRoutingModule
  ]
})
export class BirthdayReminderModule { }
