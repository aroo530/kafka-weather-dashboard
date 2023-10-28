import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit, OnDestroy {

  constructor(private socket: Socket) {
    this.socket.on('message', () => {
      console.log('connected');
    });
  }

  produce(message: string) {
    this.socket.emit('ok', 'message');
  }

  receive(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('data', (data: any) => observer.next(data));
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.socket.disconnect(); // disconnects socket connection
  }
}
