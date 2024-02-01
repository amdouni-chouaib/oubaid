import { Component, OnInit } from '@angular/core';
import { ApieventService } from 'src/app/apievent.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit {
deleteEvent(data: any) {
  this.eventService.deleteevent(data).subscribe((data:any)=>{
    console.log("deleted")
  })
}
  events: any[] = [];

  constructor(private eventService: ApieventService) { }

  ngOnInit(): void {
    this.eventService.getallevent().subscribe(
      (events:any) => {
        this.events = events;
      },
      (error:any) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}