import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from './models/friends';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = 'http://localhost:4000/friends';
  private friendsSubject = new BehaviorSubject<Friend[]>([]);
  private friends: Friend[] = [];

  constructor(private http: HttpClient) {
    this.loadFriends();
  }

  // Încarcă prietenii de pe server și îi stochează local
  private loadFriends(): void {
    this.http.get<Friend[]>(this.apiUrl).subscribe(friends => {
      this.friends = friends;
      this.friendsSubject.next(this.friends);
    });
  }

  getFriends(): Observable<Friend[]> {
    return this.friendsSubject.asObservable();
  }

  addFriend(friend: Friend): void {
    this.http.post<Friend>(this.apiUrl, friend).subscribe(addedFriend => {
      this.friends.push(addedFriend);
      this.friendsSubject.next(this.friends);
    });
  }
  
  deleteFriend(friend: Friend): void {
    this.http.delete(`${this.apiUrl}/${friend.id}`).subscribe(() => {
      this.friends = this.friends.filter(f => f.id !== friend.id);
      this.friendsSubject.next(this.friends);
    });
  }

  getFriendById(id: number): Observable<Friend> {
    return this.http.get<Friend>(`${this.apiUrl}/${id}`);
  }

  updateFriend(friend: Friend): Observable<Friend> {
    return this.http.put<Friend>(`${this.apiUrl}/${friend.id}`, friend);
  }
}
