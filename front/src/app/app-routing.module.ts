import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayEventComponent } from './event/display-event/display-event.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { UpdateEventComponent } from './event/update-event/update-event.component';

const routes: Routes = [
  {path:"",component:DisplayEventComponent},
  {path:"add",component:AddEventComponent},
  {path:"update/:id",component:UpdateEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
