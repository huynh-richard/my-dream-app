import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  constructor() { }

  private hubConnection: signalR.HubConnection

  public startConnection(username){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://chat-app-api.apps.pgw2.us.lmco.com//chathub")
    .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.sendMessage(username, ' entered the chat!')
      })
      .catch(err => console.log(err));
  }

  public messageListener(){
    this.hubConnection.on("messageReceived", (username: string, message: string) => {
      console.log(username + message);
    })
  }

  public sendMessage(username: string, message: string){
    return this.hubConnection.send('newMessage', username, message).then();
  }

  public onClose(username){
    this.sendMessage(username, ' left the chat');
    this.hubConnection.stop();
  }
}
