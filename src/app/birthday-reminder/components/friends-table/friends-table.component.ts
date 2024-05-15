// // // src/app/friends-table/friends-table.component.ts
// // import { Component, OnInit } from '@angular/core';
// // import { Friend } from '../models/friend';
// // import { BirthdayService } from '../birthday.service';

// // @Component({
// //   selector: 'app-friends-table',
// //   templateUrl: './friends-table.component.html',
// //   styleUrls: ['./friends-table.component.css']
// // })
// // export class FriendsTableComponent implements OnInit {
// //   friends: Friend[] = [];
// //   nextBirthdayFriend: Friend | undefined;


// //   constructor(private birthdayService: BirthdayService) {
// //   }

// //   ngOnInit(): void {
// //     this.friends = this.birthdayService.getFriends();
// //     this.updateNextBirthday();
// //   }

// //   updateNextBirthday(): void {
// //     this.nextBirthdayFriend = this.birthdayService.getNextBirthday();  // Asigură-te că această funcție returnează Friend sau undefined
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { Friend } from '../models/friend';
// import { BirthdayService } from '../birthday.service';

// @Component({
//   selector: 'app-friends-table',
//   templateUrl: './friends-table.component.html',
//   styleUrls: ['./friends-table.component.css']
// })
// export class FriendsTableComponent implements OnInit {
//   friends: Friend[] = [];
//   nextBirthdayFriend: Friend | undefined;

//   constructor(private birthdayService: BirthdayService) {}

//   ngOnInit(): void {
//     this.birthdayService.getFriends().subscribe(friends => {
//       this.friends = friends;
//       this.updateNextBirthday();
//     });
//   }

//   updateNextBirthday(): void {
//     this.nextBirthdayFriend = this.birthdayService.getNextBirthday();
//   }

  

//   deleteFriend(friend: Friend): void {
//     if (friend.id) { // Make sure the friend has an id before attempting to delete
//         this.birthdayService.deleteFriend(friend);
//     } else {
//         console.error('Attempted to delete a friend without an ID');
//     }
// }
  
  
// }

import { Component, OnInit } from '@angular/core';
import { BirthdayService } from '../../birthday.service';
import { Friend } from '../../models/friends';

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.css']
})
export class FriendsTableComponent implements OnInit {
  friends: Friend[] = [];
  nextBirthdayFriend: Friend | undefined;
  sortColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    this.birthdayService.getFriends().subscribe(friends => {
      this.friends = friends;
      this.sortData();
  
    });
  }

  sortData(): void {
    if (!this.sortColumn) return; // Asigură că există o coloană după care să se sorteze
  
    this.friends = this.friends.sort((a, b) => {
      const valueA = a[this.sortColumn as keyof Friend]; // Cast explicite când accesăm proprietățile
      const valueB = b[this.sortColumn as keyof Friend];
  
      let comparison = 0;
      if (valueA !== undefined && valueB !== undefined) {
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
      }
  
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  
  toggleSort(column: keyof Friend): void {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }



  deleteFriend(friend: Friend): void {
    if (friend.id) { // Make sure the friend has an id before attempting to delete
        this.birthdayService.deleteFriend(friend);
    } else {
        console.error('Attempted to delete a friend without an ID');
    }
}
}
