import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Guest, GuestForm } from './guest.model';
import { InvitationService } from '../../services/invitation.service';
import { catchError, of, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class InvitationFormComponent implements OnInit {
  client: any;
  guestId?: string;
  guest: Guest | null | undefined = undefined;
  loading = true;
  validateForm!: FormGroup<GuestForm>;
  private readonly clientId: string;
  readonly appLink = environment?.url;

  constructor(private fb: NonNullableFormBuilder,
              private invitationService: InvitationService,
              private route: ActivatedRoute) {
    this.clientId = route?.snapshot?.params['clientId'];
    this.guestId = route?.snapshot?.params['guestId'];

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      extraPerson1: [''],
      extraPerson2: [''],
      clientId: [this.clientId]
    });
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--bg-color', 'black');

    this.invitationService.getClientInfo(this.clientId)
      .pipe(take(1))
      .subscribe((res) => {
        this.client = res;
        this.loading = false;
      });

    if (this.guestId) {
      this.invitationService.getGuestInfo(this.guestId, this.clientId)
        .pipe(take(1))
        .subscribe((res: Guest) => {
          this.validateForm.patchValue({...res});
        });
    }
  }

  getLink(path: string): string {
    return `${this.appLink}${path}/${this.guest?.clientId}/${this.guest?.id}`
  }

  submitForm(): void {
    this.loading = true;

    const req = this.guestId
      ? this.invitationService.editGuest(this.validateForm.value as Guest, this.guestId)
      : this.invitationService.saveGuest(this.validateForm.value);

    req.pipe(
      take(1),
      catchError((error) => {
        return of(null);
      }))
      .subscribe((res: Guest | null) => {
        this.guest = res;
        this.loading = false;
        document.documentElement.style.setProperty('--bg-color', 'black');
      });
  }
}
