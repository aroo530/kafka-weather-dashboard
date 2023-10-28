import {AfterViewInit, Component, OnInit} from '@angular/core';

import {FormBuilder, Validators} from '@angular/forms';
import {SocketService} from './socket.service';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  chart: any;
  condition: conditionData | undefined;
  location: any;
  lastUpdated: Date | undefined;
  temps: temperatureData[] = [];
  title = 'frontend';
  data: any[] | undefined;
  producerForm = this.fb.group({
    message: ['', Validators.required]
  });


  produce() {
    console.log(this.producerForm.value.message);
    this.socket.produce(this.producerForm.value.message as string);
  }

  async receive() {
    this.socket.receive().subscribe(data => {

      const timestamp = new Date(data.location.localtime_epoch * 1000);
      const temp = data.current.temp_c;
      this.temps.push({temperature: temp, timestamp: timestamp});
      this.location = data.location;
      this.condition = {condition: data.current.condition.text, iconURL: data.current.condition.icon};
      this.chart.data.labels = this.temps.map(t => t.timestamp.toLocaleTimeString() as string);
      this.chart.data.datasets[0].data.push(temp);
      this.chart.update();
      this.lastUpdated = new Date();
    });
  }


  constructor(private fb: FormBuilder, private socket: SocketService) {
    this.data = [];
    this.receive().then();
  }


  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    // @ts-ignore

    Chart.register({
      id: 'bar',
      type: 'bar',
      options: {
        // chart options here
      }
    });

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.temps.map(t => t.timestamp.toLocaleTimeString() as string),
        datasets: [
          {
            label: 'Data from Server',
            data: this.temps.map(t => t.temperature as number),

            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 40
          }
        }
      }

    });
  }

  ngAfterViewInit() {
  }
}

type temperatureData = {
  temperature: number;
  timestamp: Date;
};
type conditionData = {
  condition: string;
  iconURL: string;
}
