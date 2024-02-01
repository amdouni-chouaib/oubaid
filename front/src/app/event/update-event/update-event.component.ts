import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApieventService } from 'src/app/apievent.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventId: any;
  eventForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApieventService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadEventData();
  }

  initializeForm(): void {
    this.eventForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      isVirtual: [false],
      isPhysical: [false],
      location: this.formBuilder.group({
        state: [''],
        placeName: [''],
        placeLink: [''],
        locationDescription: ['']
      }),
      virtualDetails: this.formBuilder.group({
        application: [''],
        applicationLink: ['']
      })
    });
  }

  loadEventData(): void {
    this.apiService.getoneevent(this.eventId).subscribe(
      (data: any) => {
        this.eventForm.patchValue(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    const formData = this.eventForm.value;
    this.apiService.updateevent(formData, this.eventId).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success, e.g., redirect to event list page
      },
      (error:any) => {
        console.error(error);
        // Handle error, show error message, etc.
      }
    );
  }
}