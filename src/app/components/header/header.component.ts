import { Component, OnInit } from '@angular/core';
import {ChartService} from '../../services/chart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public chartService: ChartService) { }

  ngOnInit() {
  }

}
