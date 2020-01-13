import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/index';

@Component({
    template: `
        <div>
            <h1>Upcoming Angular Events</h1>
            <hr>
            <div class="row">
                <div  *ngFor="let event of events" class="col-md-5">
                    <event-thumbnail #thumbnail (click)="handleThumbnailClick(event.name)" [event]='event'></event-thumbnail>
                </div>
           </div>
        </div>
    `
})
export class EventsListComponent implements OnInit {
    events: IEvent[];
    constructor(@Inject(EventService) private eventService: EventService,
                @Inject(ToastrService) private toastrService: ToastrService,
                @Inject(ActivatedRoute) private route: ActivatedRoute) { }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }

    handleThumbnailClick(eventName) {
      this.toastrService.success(eventName);
    }
  }
