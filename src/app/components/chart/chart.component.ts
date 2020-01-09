import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../services/chart.service';
import * as ECHARTS from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  labels: string[];
  data: number[];

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.labels = this.getDataLabels();
    this.data = this.sortIntoArray(this.chartService.currentChat, this.labels);
    this.createChart(this.data, this.labels);
  }

  getDataLabels(): string[] {
    const twentySeventeen: string[] = this.chartService.getLabels(2017);
    const twentyEighteen: string[] = this.chartService.getLabels(2018);
    const twentyNineteen: string[] = this.chartService.getLabels(2019);
    const twentyTwenty: string[] = this.chartService.getLabels(2020);

    return twentySeventeen.concat(twentyEighteen, twentyNineteen, twentyTwenty);
  }

  sortIntoArray(data: string, labels: string[]): number[] {
    const twentySeventeen = this.createDataArray(data, '2017', 'last', 0);
    const twentyEighteen = this.createDataArray(data, '2018', 0, 1);
    const twentyNineteen = this.createDataArray(data, '2019', 0, 1);
    const twentyTwenty = this.createDataArray(data, '2020', 0, 1);

    const twentySeventeenData: number[] = this.chartService.getData(twentySeventeen, labels, '2017');
    const twentyEighteenData: number[] = this.chartService.getData(twentyEighteen, labels, '2018');
    const twentyNineteenData: number[] = this.chartService.getData(twentyNineteen, labels, '2019');
    const twentyTwentyData: number[] = this.chartService.getData(twentyTwenty, labels, '2020');

    return twentySeventeenData.concat(twentyEighteenData, twentyNineteenData, twentyTwentyData);
  }

  createDataArray(data: string, year: string, spliceStart, spliceEnd) {
    const fullData = data.split(year);
    if (typeof spliceStart === 'string') {
      fullData.splice(fullData.length - 1, spliceEnd);
      return fullData;
    }
    fullData.splice(spliceStart, spliceEnd);
    return fullData;
  }

  createChart(dataArray, labelsArray) {
    const myChart = ECHARTS.init(document.getElementById('main'), null, {renderer: 'svg'});
    // specify chart configuration item and data
    const option = {
      xAxis: {
        data: labelsArray,
        show: false
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          color: 'rgb(62, 205, 237)',
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)'
        },
        // areaStyle: {
        //   color: new ECHARTS.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 1,
        //     color: 'rgb(52, 183, 235)'
        //   }, {
        //     offset: 1,
        //     color: 'rgb(255, 158, 68)'
        //   }])
        // },
        data: dataArray,
      }]
    };
    // use configuration item and data specified to show chart
    myChart.setOption(option);
  }

}
