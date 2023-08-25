import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/servies/socket.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements AfterViewInit {
 
  // @ViewChild is a decorator in Angular that allows you to access a reference to a child component, directive, or HTML element within a parent component's template. This enables you to interact with the child component's properties, methods, or the DOM elements it represents.
  @ViewChild('canvas', { static: true })canvasRef!: ElementRef;
  context:any;
  draw_color:string = "black";
  draw_width:string = "1";
  is_drawing:boolean = false;
  
  constructor(private socketService : SocketService){}
  
  ngAfterViewInit(): void {
    // Access the HTML element using nativeElement
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
  }
  
  change_color(color: any) {
     console.log(color)
    }
  
  startDrawing($event: MouseEvent) {   // method to start drawing in canvas using events
  this.is_drawing = true;
  this.context.beginPath();
  this.context.moveTo($event.clientX - this.canvasRef.nativeElement.offsetLeft,$event.clientY - this.canvasRef.nativeElement.offsetTop);
  $event.preventDefault();
  }

  draw($event:MouseEvent) {  
     if(this.is_drawing){
      this.context.lineTo($event.clientX - this.canvasRef.nativeElement.offsetLeft, $event.clientY - this.canvasRef.nativeElement.offsetTop);
      this.context.strokeStyle = this.draw_color;
      this.context.lineWidth = this.draw_width;
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.stroke();
      // this.socketService.emitDraw({})
     }
  }
  stopDrawing($event:MouseEvent) {    // method to stop drawing
    if(this.is_drawing){
      this.context.stroke();
      this.context.closePath();
      this.is_drawing = false;
    }
    $event.preventDefault();
  }
  
  clearCanvas() {   // method for clearing canvas
      this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)
    }

   listenForDrawEvent(){   // Listen to the Event from the servies 
      this.socketService.onDraw().subscribe((data)=>{    // To recive data from an Observable.
           // 
           this.context.lineTo(data.x,data.y);
           this.context.stroke();
      });
    }
  

}
