import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InvitationService } from '../../services/invitation.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Guest, GuestStatus } from '../invitation-form/guest.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rejection-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './rejection-form.component.html',
  styleUrl: './rejection-form.component.scss'
})
export class RejectionFormComponent {
  guestId: string;
  guest: Guest | null | undefined = undefined;
  private readonly clientId: string;
  readonly appLink = environment?.url;


  constructor(
    private invitationService: InvitationService,
    private route: ActivatedRoute
  ) {
    this.clientId = route?.snapshot?.params['clientId'];
    this.guestId = route?.snapshot?.params['guestId'];
  }

  getLink(path: string): string {
    return `${this.appLink}${path}/${this.guest?.clientId}`
  }

  rejectInvitation(): void {
    this.invitationService.rejectInvitation(this.guestId, this.clientId)
      .pipe(take(1))
      .subscribe((res) => {
        this.guest = res;
      })
  }

}
