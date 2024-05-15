// src/app/friend-edit/friend-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BirthdayService } from '../../birthday.service';
import { Friend } from '../../models/friends';
import { CustomValidators } from '../../validators/custum-validators';


@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.css']
})
export class FriendEditComponent implements OnInit {
  friendForm: FormGroup;
  currentFriendId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private birthdayService: BirthdayService,
    private router: Router
  ) {
    this.friendForm = new FormGroup({
      firstName: new FormControl('', [Validators.required , CustomValidators.alphabetic()]),
      lastName: new FormControl('', [Validators.required , CustomValidators.alphabetic()]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      city: new FormControl('', [Validators.required , CustomValidators.alphabetic()]),
      birthday: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if (id) {
        this.currentFriendId = id;
        this.birthdayService.getFriendById(this.currentFriendId).subscribe(friend => {
          this.friendForm.patchValue(friend);
        });
      }
    });
  }

  updateFriend(): void {
    if (this.friendForm.valid && this.currentFriendId) {
      const updatedFriend: Friend = {...this.friendForm.value, id: this.currentFriendId};
      this.birthdayService.updateFriend(updatedFriend).subscribe({
        next: () => {
          this.router.navigate(['/friends']);
        },
        error: (error) => console.error('Error updating friend:', error)
      });
    }
  }
}
