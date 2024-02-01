import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApieventService } from 'src/app/apievent.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder,private service:ApieventService) { }

  ngOnInit(): void {
    this.createEventForm();
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      clubName: ['', Validators.required],
      startDate: [null, Validators.required],
      finishDate: [null, Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      isVirtual: [false],
      isPhysical: [false],
      location: this.fb.group({
        state: [''],
        placeName: [''],
        placeLink: [''],
        locationDescription: [''],
      }),
      virtualDetails: this.fb.group({
        application: [''],
        applicationLink: [''],
      }),
    });
  }

  onSubmit() {

    this.service.addevent(this.eventForm.value).subscribe((data:any)=>{
      console.log("added")
    })



    //  console.log(this.eventForm.value);
  }
}