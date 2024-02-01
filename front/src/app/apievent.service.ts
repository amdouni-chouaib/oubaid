import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApieventService {

  constructor(private http:HttpClient) { }

  addevent(data:any){
    return this.http.post("http://localhost:3001/events/add",data)
  }
  updateevent(data:any,id:any){
    return this.http.put("http://localhost:3001/events/update/"+id,data)
  }
  getallevent(){
    return this.http.get("http://localhost:3001/events/getall")
  }
  deleteevent(id:any){
    return this.http.delete("http://localhost:3001/events/delete/"+id)
  }
  getoneevent(id:any){
    return this.http.get("http://localhost:3001/events/getone/"+id)
  }

}
