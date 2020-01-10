import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { EventService } from '../shared/event.service';

@Injectable({providedIn: 'root'})
export class EventRouteActivator implements CanActivate {

  constructor(@Inject(EventService) private eventService: EventService, @Inject(Router) private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const eventExists = !!this.eventService.getEvent(+route.params['id']);
    if (!eventExists) {
      this.router.navigate(['/404']);
    }
    return eventExists;
  }
}
