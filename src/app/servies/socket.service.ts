import { Injectable } from '@angular/core';
import { Observable, observeOn } from 'rxjs';
import {io} from 'socket.io-client';


@Injectable({
  providedIn: 'root' // Register at root level
})
export class SocketService {

  socket:any;
  constructor() { 
     this.socket = io('http://localhost:3000');  // Server-Side URL
  }

  emitDraw(data:any){    
    this.socket.emit('draw',data);
  }

  // Observables represent streams of data or events that can be observed over time.
  onDraw():Observable<any>{      
    return new Observable((observer)=>{  //Observer: An observer is an object with callbacks that react to data emissions. It typically has methods like next (emits a value), error (handles errors), and complete (handles completion).
      this.socket.on('draw',(data:any)=>{
          observer.next(data);
      });
    });
  }

}
