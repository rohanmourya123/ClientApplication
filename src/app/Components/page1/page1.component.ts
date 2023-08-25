import { AfterViewInit, Component, ViewChild,ElementRef } from '@angular/core';
import { SocketService } from 'src/app/servies/socket.service';  // import service


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements AfterViewInit {

  // @ViewChild is a decorator in Angular that allows you to access a reference to a child component, directive, or HTML element within a parent component's template. This enables you to interact with the child component's properties, methods, or the DOM elements it represents.
  
@ViewChild('canvas', { static: true })canvasRef!: ElementRef;
context:any;
draw_color:string = "black";
draw_width:string = "1";
is_drawing:boolean = false;


constructor(private socketService : SocketService){} // Injecting Dependence in constructor



ngAfterViewInit(): void {
  // Access the HTML element using nativeElement
  const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
  this.context = canvas.getContext('2d');
}

change_color(color: any) {} 

startDrawing($event: MouseEvent) {   // method to start drawing in canvas using events
this.is_drawing = true;
this.context.beginPath();
this.context.moveTo($event.clientX - this.canvasRef.nativeElement.offsetLeft,$event.clientY - this.canvasRef.nativeElement.offsetTop);
$event.preventDefault();
}
draw($event:MouseEvent) {     // 
   if(this.is_drawing){
    const x = $event.clientX - this.canvasRef.nativeElement.offsetLeft;
    const y = $event.clientY - this.canvasRef.nativeElement.offsetTop
    this.context.lineTo(x,y);
    this.context.strokeStyle = this.draw_color;
    this.context.lineWidth = this.draw_width;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.stroke();
    this.socketService.emitDraw({x,y})
   }
}
stopDrawing($event:MouseEvent) {  // method to stop drawing
  if(this.is_drawing){
    this.context.stroke();
    this.context.closePath();
    this.is_drawing = false;
  }
  $event.preventDefault();
}

clearCanvas() {  // method for clearing canvas
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)
  }

}
