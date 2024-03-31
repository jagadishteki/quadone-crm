import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/crm/data.service';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  chart: any = [];
  data: { name: string }[] = [];

  users: any[] = [];
  chartData!: any[];
  labelData: any[] = [];
  realData: any[] = [];
  colorData: any[] = [];

  barChartData: any;
  barChartOptions: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // this.data = this.dataService.getDashboardData();

    this.dataService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      complete: () => {
        this.users.forEach((ele) => {
          if (!this.labelData.includes(ele.speciality)) {
            this.labelData.push(ele.speciality);
          }
        });

        this.labelData.forEach((ele) => {
          let count = 0;
          this.users.forEach((ele2) => {
            if (ele == ele2.speciality) {
              count++
            }
          })
          this.realData.push(count);
        })

        this.barChartData = {
          labels: this.labelData,
          datasets: [{
            data: this.realData,
            label: "Leads Speciality-Wise",
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        }
      }

    })
  }
}






