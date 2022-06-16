import { Component, OnInit } from '@angular/core';

export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alerts: Message[] = [];

  constructor() {}

  ngOnInit(): void {}

  public closeMessage(message: Message): void {
    const index = this.alerts.indexOf(message);
    this.alerts.splice(index, 1);
  }

  public setAlertMessage(message: Message, timeout = 4000): void {
    this.alerts.push(message);

    setTimeout(() => {
      const index = this.alerts.indexOf(message);
      if (index > -1) {
        this.alerts.splice(index, 1);
      }
    }, timeout);
  }
}
