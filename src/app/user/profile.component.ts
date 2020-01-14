import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) {

  }

  ngOnInit(): void {
    let firstName = new FormControl(this.authService.currentUser.firstName);
    let lastName = new FormControl(this.authService.currentUser.lastName);
    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    });
  }

  saveProfile(formValues) {
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
    this.router.navigate(['events']);
  }

  cancel(): void {
    this.router.navigate(['events']);
  }

}
