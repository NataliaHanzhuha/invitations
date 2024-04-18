import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from '../components/invitation-form/guest.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  // private url: string = 'http://localhost:3001/';
  private url: string = 'https://email-server-sigma.vercel.app';
  
  constructor(private http: HttpClient) { }

  saveGuest(guest: any): Observable<Guest> {
    return this.http.post<Guest>(this.url + 'guest-invitation', guest);
  }

  editGuest(guest: Guest, id: string): Observable<Guest> {
    return this.http.put<Guest>(this.url + 'guest-invitation/' + id, guest);
  }

  rejectInvitation(guestId: string,  id: string): Observable<Guest> {
    return this.http.get<Guest>(this.url + 'guest-invitation/decline/' + id + '/' + guestId);
  }

  getClientInfo(id: string): Observable<any> {
    return this.http.get(this.url + 'client/' + id);
  }

  getGuestInfo( guestId: string, id: string): Observable<Guest> {
    return this.http.get<Guest>(this.url + 'guest/' + id +'/'+ guestId);
  }

}
