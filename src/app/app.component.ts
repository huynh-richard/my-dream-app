import { Component } from '@angular/core';
import {SignalRService} from './services/signal-r.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private signalRService: SignalRService){}

  ngOnInit(): void {
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.keyCode === 13 && this.signedIn) {
        this.sendMessage();
      }
      if (e.keyCode === 13 && !this.signedIn) {
        this.initConnection();
      }
  });
  }


  public username: string = '';
  public message: string = '';
  public signedIn: boolean = false;

  public initConnection(){
    this.signalRService.startConnection(this.username);
    this.signalRService.messageListener();
    this.signedIn = true;
  }

  public logoff(){
    this.signalRService.onClose(this.username);
    this.username = '';
    this.signedIn = false;
  }

  public sendMessage() {
    this.signalRService.sendMessage(this.username + ': ', this.message).then(()=>{
        this.message = '';
      })
  }

}
